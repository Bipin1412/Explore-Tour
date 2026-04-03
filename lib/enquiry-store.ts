import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { AppEnquiryRecord, EnquiryInputMap, EnquiryVariant } from "@/types/enquiry";

const enquiryFilePath = path.join(process.cwd(), ".tmp", "enquiries.json");

async function readEnquiriesFromDisk(): Promise<AppEnquiryRecord[]> {
  try {
    const raw = await readFile(enquiryFilePath, "utf8");
    const parsed = JSON.parse(raw) as AppEnquiryRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeEnquiriesToDisk(records: AppEnquiryRecord[]) {
  await mkdir(path.dirname(enquiryFilePath), { recursive: true });
  await writeFile(enquiryFilePath, JSON.stringify(records, null, 2), "utf8");
}

export async function createEnquiry<K extends EnquiryVariant>(
  variant: K,
  data: EnquiryInputMap[K]
): Promise<AppEnquiryRecord> {
  const now = new Date().toISOString();
  const record: AppEnquiryRecord = {
    id: `enq_${crypto.randomUUID()}`,
    variant,
    createdAt: now,
    updatedAt: now,
    payload: {
      variant,
      data
    } as AppEnquiryRecord["payload"]
  };

  const existing = await readEnquiriesFromDisk();
  existing.unshift(record);
  await writeEnquiriesToDisk(existing);
  return record;
}

export async function fetchAllEnquiries(): Promise<AppEnquiryRecord[]> {
  return readEnquiriesFromDisk();
}
