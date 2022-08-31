let data = {
    "currentUser": {
        "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [
        {
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "user": {
                "image": {
                    "png": "./images/avatars/image-amyrobson.png",
                    "webp": "./images/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
            },
            "replies": []
        },
        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [
                {
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-ramsesmiron.png",
                            "webp": "./images/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-juliusomo.png",
                            "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        }
    ]
}

const commentsFeed = document.getElementById('commentsFeed');

const commentInput = document.getElementById('newCommentInput');
const commentSubmit = document.getElementById('commentSubmit');

const modal = document.getElementById('modal');
const closeModalButton = document.getElementById('closeModalButton');
closeModalButton.addEventListener('click', (event) => openDeleteModal(event))

const deleteCommentButton = document.getElementById('deleteCommentButton');
deleteCommentButton.addEventListener('click', deleteComment)

function renderComments() {
    let commentsFeedHTML = "";

    data.comments.sort((a, b) => b.score - a.score)

    data.comments.map(comment => {
        const commentHTML = `<div class="comment-wrapper">
        <div class="comment">
    <div class="vote-counter | even-columns-sm">
        <div class="scoreAdd" data-commentID="${comment.id}">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF" />
            </svg>
        </div>
        <span class="text-clr-primary-blue-400 fw-semi-bold" id=" votesCounter">${comment.score}</span>
        <div class="scoreSubtract" data-commentID="${comment.id}">
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF" />
            </svg>
        </div>
    </div>
    <div class="comment-meta | even-columns">
        <img src="${comment.user.image.png}" alt="">
        <p class="fw-semi-bold text-clr-neutral-blue-600">${comment.user.username}</p>
        <span class="text-clr-neutral-blue-300">${comment.createdAt}</span>
    </div>
    <div class="comment-buttons">
    ${displayButtons(comment.user.username, comment.id)}
    </div>
    <textarea class="comment-body | text-clr-neutral-blue-300" readonly>${comment.content}</textarea>
    ${comment.user.username === data.currentUser.username ? (
                `<button class="update-button" data-type="primary" data-hidden data-commentID="${comment.id}">UPDATE</button>`
            ) : ''}
</div>
${comment.user.username !== data.currentUser.username ? (
                `<div class="reply-wrapper" data-parent="${comment.id}">
    <img class="current-profile" id="currentProfileImg" src="images/avatars/image-maxblagun.png" alt="">
    <textarea class="new-comment-input newReplyInput" name="comment" placeholder="Add a reply"
        rows="4"></textarea>
    <button class="comment-submit replySubmit" data-type="primary">SEND</button>
</div>`) : ""}
        <div class="replies-wrapper">
            ${comment.replies.length > 0 ? renderReplies(comment) : ''}
        </div>
    </div>`;

        commentsFeedHTML += commentHTML;
    })

    commentsFeed.innerHTML = commentsFeedHTML;

    commentSubmit.addEventListener('click', addNewComment);
    document.querySelectorAll('.replyButton').forEach(button => {
        button.addEventListener('click', openReply)
    })

    document.querySelectorAll('.replySubmit').forEach(button => {
        button.addEventListener('click', replyToComment)
    })

    document.querySelectorAll('.deleteButton').forEach(button => {
        button.addEventListener('click', openDeleteModal)
    })

    document.querySelectorAll('.editButton').forEach(button => {
        button.addEventListener('click', editComment)
    })

    document.querySelectorAll('.update-button').forEach(button => {
        button.addEventListener('click', saveEditComment)
    })

    document.querySelectorAll('.scoreAdd').forEach(button => {
        button.addEventListener('click', changeScore)
    })

    document.querySelectorAll('.scoreSubtract').forEach(button => {
        button.addEventListener('click', changeScore)
    })

    document.querySelectorAll('.comment-body').forEach(element => {
        const height = element.scrollHeight;

        element.style.height = height + 'px';
    })



    localStorage.setItem('data', JSON.stringify(data));
}

function displayButtons(username, commentID, parentID, isReply) {
    if (username !== data.currentUser.username) {
        if (isReply) return "";
        return `<button data-type="secondary" class="replyButton">
        <img src="/images/icon-reply.svg" alt="">
        <span>Reply</span>
    </button>`
    } else {
        return `<button data-type="secondary" data-color="red" class="deleteButton" data-commentID="${commentID}" data-parentID="${parentID}">
        <img src="/images/icon-delete.svg" alt="">
        <span>Delete</span>
    </button>
    <button data-type="secondary" class="editButton">
    <img src="/images/icon-edit.svg" alt="">
    <span>Edit</span>
</button>`
    }
}

function renderReplies(comment) {
    let repliesHTMl = '';

    comment.replies.sort((a, b) => b.score - a.score).forEach((reply) => {
        repliesHTMl += `<div class="comment">
    <div class="vote-counter | even-columns-sm">
        <div class="scoreAdd" data-commentID="${reply.id}" data-parentID="${comment.id}">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                    fill="#C5C6EF" />
            </svg>
        </div>
        <span class="text-clr-primary-blue-400 fw-semi-bold" id=" votesCounter">${reply.score}</span>
        <div class="scoreSubtract" data-commentID="${reply.id}" data-parentID="${comment.id}">
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                    fill="#C5C6EF" />
            </svg>
        </div>
    </div>
    <div class="comment-meta | even-columns">
        <img src="${reply.user.image.png}" alt="">
        <p class="fw-semi-bold text-clr-neutral-blue-600">${reply.user.username}</p>
        <span class="text-clr-neutral-blue-300">${reply.createdAt}</span>
    </div>
    <div class="comment-buttons">
        ${displayButtons(reply.user.username, reply.id, comment.id, true)}
    </div>
    <textarea class="comment-body | text-clr-neutral-blue-300" readonly>${reply.content}</textarea>
    ${reply.user.username === data.currentUser.username ? (
                `<button class="update-button" data-type="primary" data-hidden data-commentID="${reply.id}" data-parentID="${comment.id}">UPDATE</button>`
            ) : ''}
</div>`})

    return repliesHTMl
}

function addNewComment() {
    const newCommentText = commentInput.value;

    if (newCommentText === "") return;

    const newComment = {
        "id": Date.now(),
        "content": newCommentText,
        "createdAt": "2 weeks ago",
        "score": 0,
        "user": {
            "image": {
                "png": data.currentUser.image.png,
                "webp": data.currentUser.image.webp
            },
            "username": data.currentUser.username
        },
        "replies": []
    }

    data.comments.push(newComment);
    renderComments();

    commentInput.value = "";
}

function openReply(e) {
    const parentElement = e.currentTarget.closest('.comment');
    const replyWrapper = parentElement.nextElementSibling;

    replyWrapper.classList.toggle('open')
}

function replyToComment(e) {
    const replyText = e.currentTarget.previousElementSibling.value;

    if (replyText === "") return;

    const parentCommentID = e.currentTarget.closest('.reply-wrapper').dataset.parent;
    const index = data.comments.findIndex(comment => comment.id == parentCommentID);

    const newReply = {
        "id": Date.now(),
        "content": replyText,
        "score": 0,
        "replyingTo": "maxblagun",
        "user": {
            "image": {
                "png": data.currentUser.image.png,
                "webp": data.currentUser.image.webp
            },
            "username": data.currentUser.username
        }
    }

    data.comments[index].replies.push(newReply);
    renderComments();

    replyText.value = "";
}

function changeScore(e) {
    const commentID = e.currentTarget.dataset.commentid;
    const parentID = e.currentTarget.dataset.parentid;

    if (parentID) {
        const parentIndex = data.comments.findIndex(comment => comment.id == parentID);
        const commentIndex = data.comments[parentIndex].replies.findIndex(comment => comment.id == commentID);

        if (e.currentTarget.classList.contains('scoreAdd')) {
            data.comments[parentIndex].replies[commentIndex].score++;
        } else {
            data.comments[parentIndex].replies[commentIndex].score--;
        }

    } else {
        const commentIndex = data.comments.findIndex(comment => comment.id == commentID);

        if (e.currentTarget.classList.contains('scoreAdd')) {
            data.comments[commentIndex].score++;
        } else {
            data.comments[commentIndex].score--;
        }

    }

    renderComments();
}

function editComment(e) {
    const commentID = e.currentTarget.dataset.commentid;
    const parentID = e.currentTarget.dataset.parentid;

    const commentBody = e.currentTarget.closest('.comment-buttons').nextElementSibling;

    const updateButton = commentBody.nextElementSibling;

    commentBody.removeAttribute('readonly');
    commentBody.setSelectionRange(commentBody.value.length, commentBody.value.length)
    commentBody.focus();
    updateButton.removeAttribute('data-hidden');
}

function saveEditComment(e) {
    const commentID = e.currentTarget.dataset.commentid;
    const parentID = e.currentTarget.dataset.parentid;

    const commentBody = e.currentTarget.previousElementSibling;

    if (parentID) {
        const parentIndex = data.comments.findIndex(comment => comment.id == parentID);
        const commentIndex = data.comments[parentIndex].replies.findIndex(comment => comment.id == commentID);

        data.comments[parentIndex].replies[commentIndex].content = commentBody.value;
    } else {
        const commentIndex = data.comments.findIndex(comment => comment.id == commentID);
        data.comments[commentIndex].content = commentBody.value;
    }

    renderComments();
}

function openDeleteModal(e) {
    const commentID = e.currentTarget.dataset.commentid;
    const parentID = e.currentTarget.dataset.parentid;

    deleteCommentButton.dataset.commenttodelete = commentID;
    deleteCommentButton.dataset.parentid = parentID;

    modal.classList.toggle('modal-open');
}

function deleteComment(e) {
    const commentID = e.currentTarget.dataset.commenttodelete;
    const parentID = e.currentTarget.dataset.parentid;

    let newData;
    if (parentID !== "undefined") {
        const index = data.comments.findIndex(comment => comment.id == parentID);

        newData = data.comments[index].replies.filter(reply => reply.id != commentID);
        data.comments[index].replies = newData;
    } else {
        newData = data.comments.filter(comment => comment.id != commentID);
        data.comments = newData;
    }

    renderComments();

    modal.classList.toggle('modal-open');
}

(function () {
    if (localStorage.getItem('data') === null) {
        localStorage.setItem('data', JSON.stringify(data));
    } else {
        data = JSON.parse(localStorage.getItem('data'));
    }

    renderComments();
})()