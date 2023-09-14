import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => {
	const urlVideo = "https://youtube.com/shorts/" + videoId;
	ytdl(videoId, {
		quality: "lowestaudio", //Faz a qualidade do áudio ser baixa para o vídeo ser mais leve
		filter: "audioonly", //Pega só o audio do vídeo
	})
		.on("info", (info) => {
			// O on("info") retorna informações do vídeo pesquisado

			const seconds = info.formats[0].approxDurationMs;
			if (seconds > 60) {
				throw new Error("A duração do vídeo é maior que 60 segundos");
			}
		})
		.on("end", () => {
			// O on("end") retorna informações quando acabar o processo, no caso o download
			// console.log("TERMINOU O DOWNLOAD")
		})
		.on("error", (erro) => {
            // O on("error") retorna informações quando ocorre algum erro
            console.log(`Ocorreu um erro: ${erro}`)
        }).pipe(fs.createWriteStream("./tmp/audio.mp4"));
};
