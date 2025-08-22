import {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

const bucketName = process.env.YA_NAME_CLOUD;
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://s3.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YA_CLOUD_ID,
    secretAccessKey: process.env.YA_CLOUD_KEY,
  },
});

export async function uploadBaketJbj(fileName: string, result: string) {
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
  console.log("Getting bucket objects list.");
  const command = new ListObjectsCommand({
    Bucket: bucketName,
  });
  const { Contents } = await s3Client.send(command);

  const contentsList = Contents?.map((c) => {
    console.log(c);
  });
  console.log(`${contentsList}\n`);
}

// // Удалить несколько объектов
// export async function delBaketStrObj() {
//   console.log("Deleting objects.");
//   await s3Client.send(
//     new DeleteObjectCommand({ Bucket: bucketName, Key: "my-package.json" })
//   );
//   // await s3Client.send(
//   //   new DeleteObjectCommand({ Bucket: bucketName, Key: "my-package-lock.json" })
//   // );
//   console.log("The objects were deleted.\n");
// }

// export async function getBaketObj() {
//   // Получить объект
//   console.log('Getting your "bucket-text" object');
//   const { Body } = await s3Client.send(
//     new GetObjectCommand({
//       Bucket: bucketName,
//       Key: "bucket-text",
//     })
//   );
//   console.log('Your "bucket-text" content:');
//   console.log(await Body?.transformToString(), "\n");
// }
