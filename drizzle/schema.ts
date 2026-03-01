import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, longtext } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Spectra OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Image analysis records
export const imageAnalyses = mysqlTable("image_analyses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }).notNull(),
  fileUrl: text("fileUrl").notNull(),
  mimeType: varchar("mimeType", { length: 100 }).notNull(),
  fileSize: int("fileSize").notNull(),
  imageWidth: int("imageWidth"),
  imageHeight: int("imageHeight"),
  uploadedAt: timestamp("uploadedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ImageAnalysis = typeof imageAnalyses.$inferSelect;
export type InsertImageAnalysis = typeof imageAnalyses.$inferInsert;

// Forensic analysis results
export const forensicResults = mysqlTable("forensic_results", {
  id: int("id").autoincrement().primaryKey(),
  analysisId: int("analysisId").notNull(),
  classification: mysqlEnum("classification", ["real", "fake", "inconclusive"]).notNull(),
  confidenceScore: decimal("confidenceScore", { precision: 5, scale: 2 }).notNull(),
  noisePattern: varchar("noisePattern", { length: 50 }).notNull(),
  noiseUniformity: decimal("noiseUniformity", { precision: 5, scale: 2 }).notNull(),
  jpegBlockiness: decimal("jpegBlockiness", { precision: 5, scale: 2 }).notNull(),
  jpegQuantizationArtifacts: decimal("jpegQuantizationArtifacts", { precision: 5, scale: 2 }).notNull(),
  elaAnomalies: decimal("elaAnomalies", { precision: 5, scale: 2 }).notNull(),
  elaAnomalyRegions: longtext("elaAnomalyRegions"),
  frequencyDomainScore: decimal("frequencyDomainScore", { precision: 5, scale: 2 }).notNull(),
  colorChannelConsistency: decimal("colorChannelConsistency", { precision: 5, scale: 2 }).notNull(),
  spectrogramData: longtext("spectrogramData"),
  noiseResidualData: longtext("noiseResidualData"),
  elaVisualization: longtext("elaVisualization"),
  caseSummary: longtext("caseSummary"),
  technicalFindings: longtext("technicalFindings"),
  analysisTimeMs: int("analysisTimeMs").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForensicResult = typeof forensicResults.$inferSelect;
export type InsertForensicResult = typeof forensicResults.$inferInsert;

// Audit trail for analysis history
export const auditTrail = mysqlTable("audit_trail", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  analysisId: int("analysisId"),
  resultId: int("resultId"),
  action: varchar("action", { length: 100 }).notNull(),
  details: longtext("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditTrail = typeof auditTrail.$inferSelect;
export type InsertAuditTrail = typeof auditTrail.$inferInsert;