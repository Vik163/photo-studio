import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
} from "@aws-sdk/client-s3";

const bucketName = process.env.YA_NAME_CLOUD;
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://s3.yandexcloud.net",
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: {
    accessKeyId: process.env.YA_CLOUD_ID,
    secretAccessKey: process.env.YA_CLOUD_KEY,
  },
});

export async function uploadBaketObj(fileName: string, result: string) {
  const res = await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: result,
    })
  );

  if (res.$metadata.httpStatusCode == 200) {
    return "Ok";
  } else return "No";
}

export async function getBaketListObj() {
  // Получить список объектов
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  });
  const { Contents } = await s3Client.send(command);

  const contentsList = Contents?.map((c) => {
    console.log(c);
  });
  console.log(`${contentsList}\n`);
}

// Удалить объект
export async function delBaketObj(key: string) {
  const res = await s3Client.send(
    new DeleteObjectCommand({ Bucket: bucketName, Key: key })
  );
  return res.$metadata.httpStatusCode;
}

// Получить объект
export async function getBaketObj(key: string) {
  try {
    const { Body } = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      })
    );

    return await Body?.transformToString()!;
  } catch (e) {
    console.log("По полученным ключам изображения в облаке не найдены");
    return "no-img";
  }
}
