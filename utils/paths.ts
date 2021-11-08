import path from "path";

export const logoPath = "/mast.svg";

// Resources and all related subpaths

export const contentPath = path.join(process.env.RESOURCE_DIR, "content");
export const diagnosticPath = path.join(contentPath, "diagnostics");
export const unitPath = path.join(contentPath, "units");
export const quizPath = path.join(contentPath, "quizzes");

export const uploadPath = path.join(process.env.RESOURCE_DIR, "uploads");
export const applicationPath = path.join(uploadPath, "applications");
