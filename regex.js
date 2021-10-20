export const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);

export const validPassword = new RegExp('[A-Za-z0-9]{6,}');

export const validFilename = new RegExp(/^\S.*\S?$/);

export const validVideoType = new RegExp(/^(\S+)\.(mp4|MP4|ogg|OGG|webm|WEBM)$/);

export const validPicType = new RegExp(/^(\S+)\.(jpg|JPG|gif|GIF|png|PNG)$/);