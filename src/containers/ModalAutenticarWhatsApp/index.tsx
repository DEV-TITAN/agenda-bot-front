import React, { useState, useEffect } from 'react';
import { Modal } from '../../shared/components/Modal';

import QRCode from 'qrcode';

export interface ModalAutenticarWhatsAppProps {
  closeModal(): void;
  qrcodeImage: string;
}

export function ModalAutenticarWhatsApp({
  closeModal,
}: ModalAutenticarWhatsAppProps) {
  const [qrcodeImage, setQrcodeImage] = useState<string>('');
  const [listening, setListening] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        QRCode.toDataURL(parsedData, (err, url) => {
          console.log(url);
        });
        setQrcodeImage(parsedData);
        setVisible(true);
      };

      setListening(true);
    }
  }, [listening, qrcodeImage]);

  return (
    <Modal
      visible={visible}
      title="Autenticar WhatsApp"
      closeModal={closeModal}
    >
      <img alt="qr code" src={qrcodeImage} />
    </Modal>
  );
}

export default ModalAutenticarWhatsApp;
