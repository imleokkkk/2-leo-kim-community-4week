document.addEventListener("DOMContentLoaded", () => {
	const email = document.getElementById("email");
	const profilePreview = document.getElementById("profilePicAdd");
	const nickname = document.getElementById("nickname");
	const nicknameHelper = document.getElementById("nicknameHelper");
	const confirmButton = document.getElementById("confirmButton");
	const signOutButton = document.getElementById("signOut");
	const signOutModal = document.getElementById("signOutModal");
	const confirmSignOut = document.getElementById("confirmSignOut");
	const cancelSignOut = document.getElementById("cancelSignOut");
	const header = document.getElementById("headerContents");

	const loginUser = JSON.parse(sessionStorage.getItem("loginUser"));
	const members = JSON.parse(localStorage.getItem("members"));
	const posts = JSON.parse(localStorage.getItem("posts"));

	email.innerText = loginUser.email;
	nickname.value = loginUser.nickname;
	const preview = loginUser.profile ? loginUser.profile : "./profileAdd.svg";
	profilePreview.src = preview;

	const profilePic = document.createElement("img");
	profilePic.id = "profilePic";
	profilePic.src = loginUser.profile
		? loginUser.profile
		: "./profile_img.webp";
	profilePic.style.width = "30px";
	profilePic.style.height = "30px";
	profilePic.style.borderRadius = "50%";
	header.appendChild(profilePic);

	nickname.addEventListener("focusout", () => {
		nicknameHelper.innerText = validateNickname(nickname.value, loginUser);
		updateButtonState();
	});

	const updateButtonState = () => {
		if (
			nickname.value && // 모든 필드가 채워짐
			nicknameHelper.innerText.trim() === "" // 오류 메시지가 없는지 확인
		) {
			confirmButton.disabled = false;
		} else {
			confirmButton.disabled = true;
		}
	};

	confirmButton.addEventListener("click", () => {
		if (confirmButton.disabled) return;

		loginUser.nickname = nickname.value;
		sessionStorage.setItem("loginUser", JSON.stringify(loginUser));

		for (let i = 0; i < members.length; i++) {
			const item = members[i];
			if (item.email === loginUser.email) {
				item.nickname = nickname.value;
				members[i] = item;
				break;
			}
		}

		localStorage.setItem("members", JSON.stringify(members));
	});

	signOutButton.addEventListener("click", () => {
		signOutModal.style.display = "block";
	});

	cancelSignOut.addEventListener("click", () => {
		signOutModal.style.display = "none";
	});

	confirmSignOut.addEventListener("click", () => {
		sessionStorage.removeItem("loginUser");
		const newPosts = posts.filter(
			(post) => post.author !== loginUser.email
		);
		const newMembers = members.filter(
			(member) => member.email !== loginUser.email
		);
		localStorage.setItem("members", JSON.stringify(newMembers));
		localStorage.setItem("posts", JSON.stringify(newPosts));
		window.location.href = "Log in.html";
	});
});

const validateNickname = (nickname, loginUser) => {
	if (!nickname) {
		return "*닉네임을 입력해주세요.";
	}

	if (/\s/.test(nickname)) {
		return "*띄어쓰기를 없애주세요.";
	}

	if (nickname.length > 10) {
		return "*닉네임은 최대 10자까지 작성 가능합니다.";
	}

	const members = JSON.parse(localStorage.getItem("members")) || [];
	for (let i = 0; i < members.length; i++) {
		const item = members[i];
		if (!item.email) continue;
		if (loginUser.nickname != nickname && item.nickname === nickname)
			return "*중복된 닉네임 입니다.";
	}

	return "";
};
