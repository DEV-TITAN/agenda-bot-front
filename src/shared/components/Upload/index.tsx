import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../Button';
import themeDefault from '../../../assets/photo-theme.jpg';
import {
  ButtonChange,
  DropzoneUploadAudio,
  FileContent,
  FileFooter,
} from './style';

interface UploadProps {
  handleOnChange(value: any): void;
  currentAudio: string | null;
}

export interface IFile {
  file?: File;
  name: string;
  type: string;
  preview: string;
  lastModified: number;
}

export function Upload({ currentAudio, handleOnChange }: UploadProps) {
  const [files, setFiles] = useState<IFile[]>([]);
  const [audio, setAudio] = useState<string>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: ['.mp3'],
    onDrop: audioFile => {
      setFiles(
        audioFile.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) }),
        ),
      );
      handleOnChange(audioFile);
    },
    maxFiles: 1,
  });

  useEffect(
    () => () => {
      files.forEach(file => {
        URL.revokeObjectURL(file.preview);
      });
    },
    [files],
  );

  const thumbs = files.map((file, index) => (
    <audio key={index} controls>
      <track kind="captions" />
      <source src={file.preview} type="audio/mp3" />
      <p>Formato não suportado</p>
    </audio>
  ));

  useEffect(() => {
    if (currentAudio) {
      setAudio(currentAudio);
    }

    if (audio) {
      setFiles([
        {
          name: audio,
          preview: audio,
          type: 'mp3',
          lastModified: dayjs().get('date'),
        },
      ]);
    }
  }, []);

  return (
    <>
      {!audio || files.length > 0 ? (
        <>
          {!files.length ? (
            <DropzoneUploadAudio {...getRootProps()}>
              <p>
                <input {...getInputProps()} />
                Selecione um arquivo do seu computador
              </p>
            </DropzoneUploadAudio>
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
          <audio controls>
            <track kind="captions" />
            <source src={audio} type="audio/mp3" />
            <p>Formato não suportado</p>
          </audio>

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
