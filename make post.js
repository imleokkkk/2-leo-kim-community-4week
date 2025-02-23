document.addEventListener("DOMContentLoaded", () => {
	const title = document.getElementById("titleInput");
	const content = document.getElementById("contentInput");
	const helper = document.getElementById("helper");
	const completeButton = document.getElementById("completeButton");
	const fileInput = document.querySelector("input[type='file']");
	const showImage = document.getElementById("showImage");
	let uploadedImage = "";

	title.addEventListener("input", () => {
		title.value = title.value.substring(0, 26);
	});

	title.addEventListener("focusout", () => {
		completeButton.style.backgroundColor = buttonColor(
			title.value,
			content.value
		);
	});

	content.addEventListener("focusout", () => {
		completeButton.style.backgroundColor = buttonColor(
			title.value,
			content.value
		);
	});

	// 파일 업로드 처리
	fileInput.addEventListener("change", function () {
		const file = fileInput.files[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = function (e) {
				uploadedImage = e.target.result; // 이미지 데이터를 base64로 저장
				showImage.innerHTML = `<img src="${uploadedImage}" width="200" alt="업로드 이미지" />`;
			};
			reader.readAsDataURL(file);
		}
	});

	completeButton.addEventListener("click", () => {
		helper.innerText = validateTitleAndContent(title.value, content.value);

		if (!helper.innerText) {
			const posts = JSON.parse(localStorage.getItem("posts")) || [];
			const author = JSON.parse(sessionStorage.getItem("loginUser"));
			if (!author) {
				document.location.href = "Log in.html";
			}
			const date = new Date();
			const dateTimeString =
				date.toDateString() + " " + date.toLocaleTimeString();

			console.log(author);
			const post = {
				title: title.value,
				likes: [],
				comments: [],
				views: 0,
				date: dateTimeString,
				contents: content.value,
				nickname: author.nickname,
				author: author.email,
				image: uploadedImage,
				profilePic: author.profile,
			};
			posts.push(post);
			localStorage.setItem("posts", JSON.stringify(posts));
			document.location.href = "Posts.html";
		}
	});
});

// 제목, 좋아요, 댓글, 조회수, 날짜, 내용, 이미지

const validateTitleAndContent = (title, content) => {
	if (!title || !content) return "*제목 내용을 모두 작성해주세요.";

	return "";
};

const buttonColor = (title, content) => {
	if (!title || !content) return "#aca0eb";
	else {
		return "#7f6aee";
	}
};
