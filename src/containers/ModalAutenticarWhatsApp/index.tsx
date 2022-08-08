import React, { useState, useEffect } from 'react';
import { Modal } from '../../shared/components/Modal';

import QRCode from 'qrcode';

export interface ModalAutenticarWhatsAppProps {
  closeModal(): void;
  visible: boolean;
}

export function ModalAutenticarWhatsApp({
  visible,
  closeModal,
}: ModalAutenticarWhatsAppProps) {
  const [qrcodeImage, setQrcodeImage] = useState<string>('');
  const [listening, setListening] = useState<boolean>(false);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource('http://localhost:3001/events');

      events.onmessage = event => {
        const parsedData = JSON.parse(event.data);
        QRCode.toDataURL(parsedData, (err, url) => {
          console.log(url);
        });
        setQrcodeImage(parsedData);
        setmodalVisible(true);
      };

      setListening(true);
    }
  }, [listening, qrcodeImage]);

  return (
    <Modal
      visible={visible || modalVisible}
      title="Autenticar WhatsApp"
      closeModal={closeModal}
    >
      <img
        alt="qr code"
        src="https://www.wix.com/tools/qr-code-generator/_functions/svg/250/000/fff/SGVsbG8="
      />
    </Modal>
  );
}

export default ModalAutenticarWhatsApp;
