<template>
    <div class="category-wrapper">
      <div class="category-slider">
        <div class="slider-nav">
          <ul class="nav-list">
            <li class="item-line"></li>
            <li class="nav-item">专业类别
              <ul class="item-list">
                  <li
                    class="item-info"
                    v-for="(categoryItem, index) in professionalCategory"
                    :key="index"
                    :style="handleSliderStyle(categoryItem.value)"
                    @click="handleCategory(categoryItem)">
                    {{categoryItem.category}}
                  </li>
              </ul>
            </li>
            <li class="item-line"></li>
            <li class="nav-item">公共知识
              <ul class="item-list">
                <li class="item-info"
                  v-for="publicItem in publicKnowledge"
                  :key="publicItem.value"
                  :style="handleSliderStyle(publicItem.value)"
                   @click="handlePublic(publicItem)">
                   {{publicItem.category}}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="category-middle">
        <div class="common-view">
          <common-view :categoryarticle="categoryArticle"></common-view>
        </div>
        <div class="pagenation">
           <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
</template>
<script>
import commonView from '@/components/common/CommonView.vue'
import { fetchAllArticles } from '@/api/index'

export default {
  name: 'category',
  components: {
    commonView
  },
  data () {
    return {
      sliderData: [{
        category: '软件工程',
        value: 0
      },
      {
        category: '计算机',
        value: 1
      },
      {
        category: '数学与金融',
        value: 2
      },
      {
        category: '教育',
        value: 3
      },
      {
        category: '艺术',
        value: 4
      },
      {
        category: '就业',
        value: 5
      },
      {
        category: '考研',
        value: 6
      }],
      sliderCategoryIndex: 0,
      sliderPublicIndex: -1,
      categoryArticle: [],
      pageSize: 6,
      currentPage: 1,
      total: 0,
      articleType: '软件工程',
      tag: ''
    }
  },
  created () {
    this.getCategoryArticles()
    this.username = localStorage.getItem('username')
    this.Bus.$on('increaselike', () => {
      this.getCategoryArticles()
    })
    this.Bus.$on('decreaselike', () => {
      this.getCategoryArticles()
    })
  },
  mounted () {
  },
  computed: {
    // ...mapState['username'],
    professionalCategory () {
      return this.sliderData.slice(0, 5)
    },
    publicKnowledge () {
      return this.sliderData.slice(5)
    }
  },
  methods: {
    // 获取专栏文章信息
    getCategoryArticles () {
      fetchAllArticles({
        articleType: this.articleType,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.categoryArticle = res.data.data
          this.total = res.data.total
        }
      })
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.getCategoryArticles()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getCategoryArticles()
    },
    // 切换路由
    handleCategory (categoryItem) {
      this.sliderCategoryIndex = categoryItem.value
      this.articleType = categoryItem.category
      this.getCategoryArticles()
    },
    // 处理样式
    handleSliderStyle (value) {
      if (value === this.sliderCategoryIndex || value === this.sliderPublicIndex) {
        return {'color': 'rgb(82, 138, 170)', 'background': '#f5f5f5'}
      } else {
        return {}
      }
    },
    handlePublic (publicItem) {
      this.sliderPublicIndex = publicItem.value
      this.articleType = publicItem.category
      this.getCategoryArticles()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$background: #fff;
$navColor:rgb(82, 138, 170);
$back_Color:#f5f5f5;
$box_shadow: #eee;
.category-wrapper{
  position: relative;
  @include flex-row;
  max-width: 960px;
  margin: 20px auto 0 auto;
  .category-slider{
    flex: 0 0 220px;
    width: 220px;
    margin-right: 20px;
    border-radius: 2px;
    box-sizing: border-box;
    .slider-nav{
      position: fixed;
      width: 180px;
      padding: 10px 20px;
      text-align: center;
      box-shadow: 4px -4px 2px $box_shadow;
      background:$background;
      .nav-list{
        width: 100%;
        height: 100%;
        .nav-item{
          line-height: 30px;
          padding: 5px;
          list-style: none;
          font-size: 16px;
          color: #2e3135;
          transition: background-color .2s, color .2s;
          cursor: pointer;
          &.recommend{
            a {
              color: #2e3135;
              &.active{
                color: $navColor;
              }
            }
            &:hover{
              color: $navColor;
              background: $back_Color;
            }
          }
          .item-list{
            font-size: 14px;
            // display: none;
            .item-info{
              line-height: 30px;
              &:hover{
                color: $navColor;
              }
            }
          }
          // &:hover{
          //   .item-list{
          //     display: block;
          //   }
          // }
        }
        .item-line{
          margin: 10px 20px;
          height: 1px;
          background: $box_shadow;
          // transform: scaleY(0.5);
        }
      }
    }
  }
  .category-middle{
    flex: 1;
    background: $background;
    border-radius: 2px;
    border: 1px solid $box_shadow;
    box-shadow: 4px -4px 2px $box_shadow;
    .common-view{
      min-height: 490px;
      padding: 0 20px;
    }
    .pagenation{
      margin-top: 20px;
      @include flex-row;
      justify-content: flex-end;
    }
  }
}

</style>
