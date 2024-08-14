import { relations } from "drizzle-orm/relations";
import {
  categories,
  invitation,
  member,
  movement,
  plan,
  products,
  shop,
  subscription,
  transaction,
  user,
} from "./schema";

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  shop: one(shop, {
    fields: [categories.shopId],
    references: [shop.id],
  }),
  products: many(products),
}));

export const shopRelations = relations(shop, ({ one, many }) => ({
  categories: many(categories),
  movements: many(movement),
  products: many(products),
  user: one(user, {
    fields: [shop.userId],
    references: [user.id],
  }),
  transactions: many(transaction),
  members: many(member),
  invitations: many(invitation),
  subscriptions: many(subscription),
}));

export const movementRelations = relations(movement, ({ one }) => ({
  product: one(products, {
    fields: [movement.productId],
    references: [products.id],
  }),
  shop: one(shop, {
    fields: [movement.shopId],
    references: [shop.id],
  }),
  transaction: one(transaction, {
    fields: [movement.transactionId],
    references: [transaction.id],
  }),
  user: one(user, {
    fields: [movement.userId],
    references: [user.id],
  }),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  movements: many(movement),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  shop: one(shop, {
    fields: [products.shopId],
    references: [shop.id],
  }),
  user: one(user, {
    fields: [products.userId],
    references: [user.id],
  }),
}));

export const transactionRelations = relations(transaction, ({ one, many }) => ({
  movements: many(movement),
  shop: one(shop, {
    fields: [transaction.shopId],
    references: [shop.id],
  }),
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  movements: many(movement),
  products: many(products),
  shops: many(shop),
  transactions: many(transaction),
  members: many(member),
  invitations: many(invitation),
  subscriptions: many(subscription),
}));

export const memberRelations = relations(member, ({ one }) => ({
  shop: one(shop, {
    fields: [member.shopId],
    references: [shop.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
}));

export const invitationRelations = relations(invitation, ({ one }) => ({
  shop: one(shop, {
    fields: [invitation.fromShopId],
    references: [shop.id],
  }),
  user: one(user, {
    fields: [invitation.fromUserId],
    references: [user.id],
  }),
}));

export const subscriptionRelations = relations(subscription, ({ one }) => ({
  user: one(user, {
    fields: [subscription.boughtBy],
    references: [user.id],
  }),
  plan: one(plan, {
    fields: [subscription.planId],
    references: [plan.id],
  }),
  shop: one(shop, {
    fields: [subscription.shopId],
    references: [shop.id],
  }),
}));

export const planRelations = relations(plan, ({ many }) => ({
  subscriptions: many(subscription),
}));
