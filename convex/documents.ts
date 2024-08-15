import { v } from "convex/values";

import { mutation, query } from "./_generated/server"
import { Doc, Id } from "./_generated/dataModel";
import { count } from "console";
import exp from "constants";

export const archive = mutation({
  args: { id: v.id("documents")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const existDocument = await ctx.db.get(args.id)

    if (!existDocument) {
      throw new Error("Document not found")
    }
    if (existDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect()

      for (const child of children) {
        await ctx.db.patch(child._id, { isArchived: true })
        await recursiveArchive(child._id)
      }
    }

    const document = ctx.db.patch(args.id, {
      isArchived: true
    })
    recursiveArchive(args.id)

    return document
  }
})

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    })

    return document
  }
})

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const existDocument = await ctx.db.get(args.id)

    if (!existDocument) {
      throw new Error("Not found")
    }

    if ( existDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        )
        .collect()

        for (const child of children) {
          await ctx.db.patch(child._id, { isArchived: false })
          recursiveRestore(child._id)
        }
    }

    // Partial 即‘部分的’，把 document 类的所有属性都变成可选的
    const options: Partial<Doc<"documents">> = {
      isArchived: false
    }

    if (existDocument.parentDocument) {
      const parent = await ctx.db.get(existDocument.parentDocument)
      // 若父文档已归档，则删除当前文档与父文档的关联
      if (parent?.isArchived) {
        options.parentDocument = undefined
      }
    }

    const document = await ctx.db.patch(args.id, options)
    return document
  }
})

export const remove = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const existDocument = await ctx.db.get(args.id)

    if (!existDocument) {
      throw new Error("Document not found")
    }
    if (existDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.delete(args.id)
    return document
  }
})

export const removeIcon = mutation({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthenticated")
    }

    const userId = identity.subject

    const existDocument = await ctx.db.get(args.id)

    if (!existDocument) {
      throw new Error("Not found")
    }

    if (existDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.patch(args.id, {
      icon: undefined
    })

    return document
  }
})

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const { id, ...rest } = args

    const existDocument = await ctx.db.get(id)

    if (!existDocument) {
      throw new Error("Document not found")
    }
    if (existDocument.userId !== userId) {
      throw new Error("Unauthorized")
    }

    const document = await ctx.db.patch(id, {
      ...rest
    })
  }
})

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents"))
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q
          .eq("userId", userId)
          .eq("parentDocument", args.parentDocument)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect()

    return documents
  }
})

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.eq(q.field("isArchived"), true),
      )
      .order("desc")
      .collect()

    return documents
  }
})

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect()

    return documents
  }
})

export const getById = query({
  args: {
    id: v.id("documents")
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    const document = await ctx.db.get(args.id)

    if (!document) {
      throw new Error(`Document ${args.id} not found`)
    }

    if (document.isPublished && !document.isArchived) {
      return document
    }

    if (!identity) {
      throw new Error("Not authenticated")
    }

    const userId = identity.subject
    if (document.userId !== userId) {
      throw new Error("Unauthorized")
    }

    return document
  }
})