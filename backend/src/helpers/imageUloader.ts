import cloudinary from '../config/cloudinary';
export const imageUploader = async (file: any, folderName: string) => {
  let cloudinaryImage;
  try {
    cloudinaryImage = await cloudinary.uploader.upload(file.path, {
      folder: folderName,
      use_filename: true,
    });
  } catch (error) {
    return {
      statusCode: 400,
      message: 'cannot upload Image',
    };
  }

  return {
    statusCode: 201,
    data: cloudinaryImage,
  };
};
