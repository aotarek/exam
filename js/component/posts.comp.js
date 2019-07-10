postsUi = {
  state: {
    posts: []
  },
  $postItems: null,
  init: function() {
    this.$postItems = document.getElementById('posts-items');
    this.state.posts = window.data.posts;

    likedPost = (postId, type) => {
      const testOperation = type === 'liked' ? true : false;
      this.state.posts.map(post => {
        if (post.id === postId.toString()) {
          if (post.loveIt === null) {
            post.loveIt = true;
            document
              .getElementById(`article-${postId}`)
              .classList.add(
                `${type === 'liked' ? 'article-liked' : 'article-disliked'}`
              );
          } else if (post.loveIt === !testOperation) {
            post.loveIt = testOperation;
            document
              .getElementById(`article-${postId}`)
              .classList.add(
                `${type === 'liked' ? 'article-liked' : 'article-disliked'}`
              );
            document
              .getElementById(`article-${postId}`)
              .classList.remove(
                `${type === 'liked' ? 'article-disliked' : 'article-liked'}`
              );
          } else if (post.loveIt === testOperation) {
            post.loveIt = null;
            document
              .getElementById(`article-${postId}`)
              .classList.remove(
                `${type === 'liked' ? 'article-liked' : 'article-disliked'}`
              );
          }
        }
      });
    };

    this.render();
  },
  render: function() {
    const { posts } = this.state;
    posts.map(post => {
      let classLiked = '';
      if (post.loveIt !== null) {
        classLiked = post.loveIt ? 'article-liked' : 'article-disliked';
      }
      let template = `<article class="posts-item-article ${classLiked}" id="article-${
        post.id
      }">
                      <h3 class="posts-item-article-title">${post.title}</h3>
                      <span class="posts-item-article-date">${post.date}</span>
                      <p class="posts-item-article-description">
                       ${post.description}
                      </p>
                      <div class="posts-item-article-button">
                        <button class="btn btn-success" type="button" onclick=likedPost(${
                          post.id
                        },'liked')>Love It</button>
                        <button class="btn btn-danger" onclick=likedPost(${
                          post.id
                        },'dislike') type="button">
                          Dont love It
                        </button>
                      </div>
                    </article>`;
      this.$postItems.insertAdjacentHTML('beforebegin', template);
    });
  }
};
