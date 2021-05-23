FROM quay.io/influxdb/influxdb@sha256:b19759cfbf552f2cca2c31c0c22bbba6f7802e55c1f63ef0a26fcb3a6acd6e5f
WORKDIR /
RUN influxdb influx setup --username thongtinvtd --password trung789 --org thongtinvtd --bucket thongtinvtd -r 0 -f