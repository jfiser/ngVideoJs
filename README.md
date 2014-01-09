ngVideoJs
=========

NG all purpose video player

A video player system which makes it simple to handle the 3 main type of video experiences:

var myVideo - new NGVideo({player params}, {video metadata params});

1. HTML5
2. Flash simple - can handle FLVs, MP4s using Flash's native NetStream. This instance of the NGVideo player weighs less than 20K.
3. Flash Adaptive bitrate streaming - uses Akamai's HDS plugin which weighs about 260K.
