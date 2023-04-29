import { z } from "zod";
import { sortBy } from "lodash";

import { Group } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  create: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    return ctx.prisma.group.create({ data: { name: input } });
  }),

  addSubgroup: publicProcedure
    .input(z.object({ name: z.string(), parentId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, parentId } = input;

      const newSubgroup = await ctx.prisma.group.update({
        where: { id: parentId },
        data: {
          children: {
            create: {
              name,
            },
          },
        },
      });
      return newSubgroup;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany({
      where: { parentId: null },
      include: { children: true },
    });
  }),
  getSubgroups: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    return ctx.prisma.group.findMany({
      where: {
        parentId: input,
      },
      include: {
        children: {
          include: {
            children: true,
          },
        },
      },
    });
  }),
});
