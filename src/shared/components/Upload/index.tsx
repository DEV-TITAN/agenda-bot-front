import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../Button';
import themeDefault from '../../../assets/photo-theme.jpg';
import {
  ButtonChange,
  DropzoneUploadImage,
  FileContent,
  FileFooter,
  Thumb,
} from './style';

interface UploadProps {
  handleOnChange(value: any): void;
  currentImage: string | null;
}

export interface IFile {
  file?: File;
  name: string;
  type: string;
  preview: string;
  lastModified: number;
}

export function Upload({ currentImage, handleOnChange }: UploadProps) {
  const [files, setFiles] = useState<IFile[]>([]);
  const [image, setImage] = useState<string>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.png', '.jpeg', '.jpg'],
    onDrop: imageFile => {
      setFiles(
        imageFile.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      );
      handleOnChange(imageFile);
    },
    maxFiles: 1,
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => {
        console.log(file.preview);
        URL.revokeObjectURL(file.preview);
      });
    },
    [files],
  );

  const thumbs = files.map((file, index) => (
    <Thumb key={index} src={file.preview} alt="" />
  ));

  useEffect(() => {
    if (currentImage) {
      setImage(currentImage);
    }

    if (image) {
      setFiles([
        {
          name: image,
          preview: image,
          type: 'img',
          lastModified: dayjs().get('date'),
        },
      ]);
    }
  }, []);

  return (
    <>
      {!image || files.length > 0 ? (
        <>
          {!files.length ? (
            <DropzoneUploadImage {...getRootProps()}>
              <p>
                <input {...getInputProps()} />
                Selecione um arquivo do seu computador
              </p>
            </DropzoneUploadImage>
          ) : (
            <FileContent>
              {thumbs}
              <FileFooter>
                <Button
                  type="button"
                  buttonType="danger"
                  buttonSize="medium"
                  onClick={() => setFiles([])}
                >
                  Excluir
                </Button>

                <ButtonChange {...getRootProps()} type="button">
                  <input {...getInputProps()} />
                  Trocar
                </ButtonChange>
              </FileFooter>
            </FileContent>
          )}
        </>
      ) : (
        <FileContent>
          <Thumb src={image.includes('null') ? themeDefault : image} alt="" />
          <FileFooter>
            <ButtonChange {...getRootProps()} type="button">
              <input {...getInputProps()} />
              Trocar
            </ButtonChange>
          </FileFooter>
        </FileContent>
      )}
    </>
  );
}
