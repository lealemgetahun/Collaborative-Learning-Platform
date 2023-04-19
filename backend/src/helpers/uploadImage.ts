import cloudinary from '../config/cloudinary';
export const uploadImage = async (file: any) => {
  let cloudinaryImage;
  try {
    cloudinaryImage = await cloudinary.uploader.upload(file.path, {
      folder: 'TeamImages',
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
