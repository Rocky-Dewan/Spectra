CREATE TABLE IF NOT EXISTS `image_analyses` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `fileKey` varchar(512) NOT NULL,
  `fileUrl` text NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `fileSize` int NOT NULL,
  `imageWidth` int,
  `imageHeight` int,
  `uploadedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `image_analyses_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `forensic_results` (
  `id` int AUTO_INCREMENT NOT NULL,
  `analysisId` int NOT NULL,
  `classification` enum('real','fake','inconclusive') NOT NULL,
  `confidenceScore` decimal(5,2) NOT NULL,
  `noisePattern` varchar(50) NOT NULL,
  `noiseUniformity` decimal(5,2) NOT NULL,
  `jpegBlockiness` decimal(5,2) NOT NULL,
  `jpegQuantizationArtifacts` decimal(5,2) NOT NULL,
  `elaAnomalies` decimal(5,2) NOT NULL,
  `elaAnomalyRegions` longtext,
  `frequencyDomainScore` decimal(5,2) NOT NULL,
  `colorChannelConsistency` decimal(5,2) NOT NULL,
  `spectrogramData` longtext,
  `noiseResidualData` longtext,
  `elaVisualization` longtext,
  `caseSummary` longtext,
  `technicalFindings` longtext,
  `analysisTimeMs` int DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `forensic_results_id` PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `audit_trail` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `analysisId` int,
  `resultId` int,
  `action` varchar(100) NOT NULL,
  `details` longtext,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `audit_trail_id` PRIMARY KEY(`id`)
);
