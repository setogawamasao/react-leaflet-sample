npx create-react-app {プロジェクト名} --typescript

npm install
npm install react-leaflet leaflet
npm i @types/react-leaflet
npm i @types/leaflet


利用しているopensslのバージョンは以下の通り。

$ openssl version
LibreSSL 2.8.3

 

まずはじめに、以下のコマンドで秘密鍵を作成する。

$ openssl genrsa -out server.key 2048
Generating RSA private key, 2048 bit long modulus
.........................................................................................+++
.......................................................+++
e is 65537 (0x10001)

 

つぎに、証明書署名要求（CSR）ファイルを作成する。ローカルで動作させるReactアプリで利用するので、CN（Common Name）をlocalhostに設定し、あとは適当に設定する。

openssl req -sha256 -new -key server.key -out server.csr -subj "//CN=localhost//O=rl00001.com//C=jp"
 

つぎに、以下の内容で、サブジェクト別名（SAN）の設定を行うためのファイルを作成しておく。ファイルの名前はsan.configとする。

subjectAltName = DNS:localhost

 

最後に、これまで作成したファイルを利用して、自己署名証明書を出力する。有効期限はざっくり100年に設定する（うるう年があるので100年は使えないが）。

openssl x509 -req -sha256 -days 36500 -in server.csr -signkey server.key -out server.crt -extfile san.config
