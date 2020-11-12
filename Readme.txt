npx create-react-app {�v���W�F�N�g��} --typescript

npm install
npm install react-leaflet leaflet
npm i @types/react-leaflet
npm i @types/leaflet


���p���Ă���openssl�̃o�[�W�����͈ȉ��̒ʂ�B

$ openssl version
LibreSSL 2.8.3

 

�܂��͂��߂ɁA�ȉ��̃R�}���h�Ŕ閧�����쐬����B

$ openssl genrsa -out server.key 2048
Generating RSA private key, 2048 bit long modulus
.........................................................................................+++
.......................................................+++
e is 65537 (0x10001)

 

���ɁA�ؖ��������v���iCSR�j�t�@�C�����쐬����B���[�J���œ��삳����React�A�v���ŗ��p����̂ŁACN�iCommon Name�j��localhost�ɐݒ肵�A���Ƃ͓K���ɐݒ肷��B

openssl req -sha256 -new -key server.key -out server.csr -subj "//CN=localhost//O=rl00001.com//C=jp"
 

���ɁA�ȉ��̓��e�ŁA�T�u�W�F�N�g�ʖ��iSAN�j�̐ݒ���s�����߂̃t�@�C�����쐬���Ă����B�t�@�C���̖��O��san.config�Ƃ���B

subjectAltName = DNS:localhost

 

�Ō�ɁA����܂ō쐬�����t�@�C���𗘗p���āA���ȏ����ؖ������o�͂���B�L�������͂�������100�N�ɐݒ肷��i���邤�N������̂�100�N�͎g���Ȃ����j�B

openssl x509 -req -sha256 -days 36500 -in server.csr -signkey server.key -out server.crt -extfile san.config
