import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';


const QrCodeScanner = () => {
const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  // Here is where useScanBarcodes() hook is called.
  // Specify your barcode format inside.
  // Detected barcodes are assigned into the 'barcodes' variable.
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  // Permissions added here.
  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => (
          <View key={idx} style={{padding: 50}}>
            <Text style={styles.barcodeTextURL}>{barcode.displayValue}</Text>
          </View>
        ))}
      </>
    )
  )
        }

        const styles = StyleSheet.create({
            barcodeTextURL: {
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
              backgroundColor: 'red',
            },
          });

  export default QrCodeScanner;
  