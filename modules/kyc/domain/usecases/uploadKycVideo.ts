import { toFormData } from "@/core/helpers";
import { uploadKycVideoDS } from "../../data/datasources/kyc.datasource";

export default async function uploadKycVideo(video: Blob) {
  const { result, error } = await uploadKycVideoDS(
    toFormData({
      video,
    })
  );
  return {
    data: { title: result.title, description: result.description },
    error,
  };
}
