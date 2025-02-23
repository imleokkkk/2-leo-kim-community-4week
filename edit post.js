document.addEventListener("DOMContentLoaded", () => {
    const postIdx = JSON.parse(localStorage.getItem("selectedPostIdx"))
    const posts = JSON.parse(localStorage.getItem("posts"))
    const post = posts[postIdx]

    const title = document.getElementById("titleInput")
    const content = document.getElementById("contentInput")
    const helper = document.getElementById("helper")
    const completeButton = document.getElementById("completeButton")
    const fileInput = document.querySelector("input[type='file']");
    const showImage = document.getElementById("showImage");
    let uploadedImage = post.image || ""

    title.value = post.title
    content.value = post.contents

    title.addEventListener("input", () => {
        title.value = title.value.substring(0,26)
    })

    title.addEventListener("focusout",()=>{
        completeButton.style.backgroundColor = buttonColor(title.value, content.value)
    })

    content.addEventListener("focusout", () => {
        completeButton.style.backgroundColor = buttonColor(title.value, content.value)
    })

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
        helper.innerText = validateTitleAndContent(title.value, content.value)

        if(!helper.innerText){
            post.title = title.value
            post.contents = content.value
            post.image = uploadedImage
            posts[postIdx] = post
            console.log(post)
            localStorage.setItem("posts", JSON.stringify(posts))
            document.location.href = "Posts.html"
        }
    })
})

const validateTitleAndContent = (title, content) => {
    if(!title || !content)
        return "*제목 내용을 모두 작성해주세요."

    return ""
}

const buttonColor = (title, content) => {
    if(!title || !content)
        return "#aca0eb"
    else{
        return "#7f6aee"
    }
}