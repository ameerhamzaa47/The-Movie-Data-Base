import { Realtime } from 'ably';

const ably = new Realtime({ key: 'zaHaNQ.19AEng:Nvs1bDlFVvjDoVAgif5PmSGIeRig6LJ95znNpKtRpEo' });
export const channel = ably.channels.get('movies-channel');