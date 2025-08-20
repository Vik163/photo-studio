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
var path = require("path");

const bucketName = process.env.YA_NAME_CLOUD;
const s3Client = new S3Client({
  region: "ru-central1",
  endpoint: "https://s3.yandexcloud.net",
  credentials: {
    accessKeyId: process.env.YA_CLOUD_ID,
    secretAccessKey: process.env.YA_CLOUD_KEY,
  },
});

export async function uploadBaketJbj(file: File) {
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async function () {
    const result = reader.result;
    if (typeof result === "string")
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: file.name,
          Body: result,
        })
      );
  };
  console.log("file:", file);

  console.log("Creating the first object from local file.");
}

export async function uploadBaketStr() {
  // // console.log(`The bucket ${bucketName} was created.\n\n`);
  // // Загрузить объекты в бакет
  // // Из строки
  console.log("Creating a object from string.");
  // await s3Client.send(
  //   new PutObjectCommand({
  //     Bucket: process.env.YA_NAME_CLOUD,
  //     Key: "bucket-text",
  //     Body: "Hello bucket!",
  //   })
  // );

  // await s3Client.send(
  //   new PutObjectCommand({
  //     Bucket: process.env.YA_NAME_CLOUD,
  //     Key: "my-package.json",
  //     Body: path.resolve(__dirname, "./src/assets/images/home-1.jpg"),
  //   })
  // );

  console.log("The object from string was created.\n");
}
// // console.log(
// //   "The first object was created.\nCreating the second object from local file."
// // );
// // await s3Client.send(
// //   new PutObjectCommand({
// //     Bucket: bucketName,
// //     Key: "my-package-lock.json",
// //     Body: readFileSync("package-lock.json"),
// //   })
// // );
// // console.log("The second object was created.\n");
// export async function getBaketListObj() {
//   // Получить список объектов
//   console.log("Getting bucket objects list.");
//   const command = new ListObjectsV2Command({ Bucket: bucketName });
//   const { Contents } = await s3Client.send(command);
//   const contentsList = Contents?.map((c) => ` • ${c.Key}`).join("\n");
//   console.log("Here's a list of files in the bucket:");
//   console.log(`${contentsList}\n`);
// }

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

// // Удаление объектов в бакетах и затем самого бакета
// // Получаем список объектов постранично
// export async function delObjAndBaket() {
//   const paginator = paginateListObjectsV2(
//     { client: s3Client },
//     { Bucket: bucketName }
//   );
//   for await (const page of paginator) {
//     const objects = page.Contents;
//     if (objects) {
//       // Выполняем команду удаления для каждого объекта через итерацию страниц с объектами
//       for (const object of objects) {
//         // Отправляем команду на удаление
//         await s3Client.send(
//           new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
//         );
//       }
//     }
//   }
// }

// export async function delBaket() {
//   // Удаляем ранее созданный бакет
//   await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
//   console.log("Your bucket was emptied and deleted.");
// }
