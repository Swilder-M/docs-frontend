<template>
  <div id="page-feedback">
    <div class="feedback-button is-flex is-align-items-center is-justify-content-center" @click="clearStatus">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-useful"></use>
      </svg>
    </div>
    <transition name="fade">
      <div v-show="showForm" class="feedback-form">
        <div class="feedback-header pl-4 is-flex is-align-items-center is-justify-content-space-between">
          {{ translations.title }}
          <div class="icon-close p-4" style="cursor: pointer" @click="clearStatus">x</div>
        </div>
        <div class="feedback-body p-4">
          <transition-expand>
            <div v-if="feedbackStatus === null" key="null" class="is-flex">
              <div
                class="feedback-button like mr-5 is-flex is-align-items-center is-justify-content-center"
                @click="pageLike"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-useful"></use>
                </svg>
              </div>
              <div
                class="feedback-button dislike is-flex is-align-items-center is-justify-content-center"
                @click="pageDislike"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-a-notuseful"></use>
                </svg>
              </div>
            </div>
            <div v-if="feedbackStatus === true" key="up">{{ translations.thanks }}</div>
            <form v-if="feedbackStatus === false" key="down" @submit.prevent="submit">
              <template v-if="$lang === 'zh'">
                <p class="mb-2 required">{{ translations.form.issues.title }}</p>
                <div class="is-flex is-align-items-center" v-for="item in translations.form.issues.list" :key="item">
                  <input class="mr-2" type="checkbox" :id="item" :value="item" v-model="formData.issues" />
                  <label :for="item">{{ item }}</label>
                </div>
              </template>
              <p :class="[{ required: $lang === 'en' }, { 'mt-4': $lang === 'zh' }, 'mb-3']">
                {{ translations.form.improveDocs }}
              </p>
              <textarea v-model="formData.suggestion" rows="2"></textarea>
              <p class="mt-4 mb-3">{{ translations.form.email }}</p>
              <input class="mb-4" v-model="formData.email" type="email" />
              <input type="submit" :value="translations.form.submit" :disabled="disabled" />
            </form>
          </transition-expand>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import TransitionExpand from './transitionExpand.vue'
export default {
  name: 'FeedbackPrompt',
  components: {
    TransitionExpand,
  },
  data() {
    return {
      showForm: false,
      feedbackStatus: null,
      formData: {
        issues: [],
      },
    }
  },

  computed: {
    translations() {
      return this.$lang === 'en'
        ? {
            title: 'Was this page useful?',
            thanks: 'Thank you for your feedback!',
            form: {
              improveDocs: 'How can we improve this page?',
              email: 'Email',
              submit: 'Submit',
            },
          }
        : {
            title: '文档内容是否有帮助？',
            thanks: '感谢你的反馈！',
            form: {
              issues: {
                title: '您在使用文档时是否遇到以下问题？',
                list: ['文档内容错误', '描述不清，内容有歧义', '链接无法打开', '这篇文档不是我需要的'],
              },
              improveDocs: '我们应该如何改进这篇文档？',
              email: '联系邮箱',
              submit: '提交',
            },
          }
    },
    disabled() {
      if (
        (this.$lang === 'zh' && !(this.formData.issues && this.formData.issues.length)) ||
        (this.$lang === 'en' && !this.formData.suggestion)
      ) {
        return true
      }
      return false
    },
  },

  methods: {
    pageLike() {
      ga('send', 'event', 'page-useful', 'like', this.$route.path, 1)
      this.feedbackStatus = true
    },

    pageDislike() {
      ga('send', 'event', 'page-useful', 'dislike', this.$route.path, 0)
      this.feedbackStatus = false
    },

    clearStatus() {
      this.showForm = !this.showForm
      setTimeout(() => {
        this.feedbackStatus = null
        this.showTips = false
        this.formData = {
          issues: [],
        }
      }, 250)
    },

    async submit() {
      try {
        const { axiosBaseUrl } = this.$themeConfig
        if (!this.formData.email) {
          delete this.formData.email
        }
        const { status, data } = await this.$axios.post(
          `${axiosBaseUrl}/doc_issues`,
          { ...this.formData, url: this.$route.path },
          {
            headers: { 'Content-Language': this.$lang },
          },
        )
        if (status === 200 && data.items.length) {
          this.feedbackStatus = true
        }
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss" scoped>
#page-feedback {
  z-index: 1;
  position: fixed;
  bottom: 8rem;
  right: 2.5rem;
  .feedback-button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background: #866dff;
    border-radius: 50%;
    font-size: 24px;
    color: #fff;
    &.like {
      color: #866dff;
      background: rgba($color: #866dff, $alpha: 0.1);
    }
    &.dislike {
      color: #343741;
      background: #eeecf5;
    }
  }
  .feedback-form {
    display: block;
    position: absolute;
    bottom: 3.5rem;
    right: 0;
    width: 280px;
    background: #fff;
    box-shadow: 0px 2px 2px 0px rgba(43, 56, 95, 0.09);
    border-radius: 8px;
    border: 1px solid rgba(231, 229, 238, 0.31);
    .feedback-header {
      height: 40px;
      background: linear-gradient(317deg, #866dff 0%, #4d6bff 100%);
      border-radius: 8px 8px 0px 0px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
    }
    .feedback-body {
      form {
        p,
        label {
          font-size: 14px;
          font-weight: 400;
          color: #343741;
          line-height: 24px;
        }
        p {
          margin: 0;
          font-weight: 500;
          &.required::before {
            content: '*';
            margin-right: 8px;
            color: #f26256;
          }
        }
        textarea,
        input[type='email'] {
          padding: 8px;
          width: 100%;
          border-radius: 8px;
          border: 1px solid #e1e3f3;
          font-size: 14px;
          font-weight: 400;
          color: #343741;
          line-height: 24px;
        }
        input[type='submit'] {
          cursor: pointer;
          padding: 8px 24px;
          border: none;
          background: linear-gradient(317deg, #866dff 0%, #4d6bff 100%);
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          line-height: 20px;
          &:disabled {
            cursor: not-allowed;
            background: rgba($color: #866dff, $alpha: 0.4);
          }
        }
        textarea {
          resize: none;
        }
      }
    }
  }
}
@media screen and (max-width: 1023px) {
  #page-feedback {
    display: none;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.2s linear, opacity 0.2s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
