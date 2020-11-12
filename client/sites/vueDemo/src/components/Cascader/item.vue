<template>
    <li class="cascader-item" @mouseenter="toggleIn" @mouseleave="toggleOut" @click="handleClick">
        <i :class="['left-icon', model.icon]" v-if="model.icon"></i>
        <div class="text">{{ model.menuName }}</div>
        <i :class="['right-icon', model.icon]" v-if="isFolder"></i>
        <ul v-if="isFolder" v-show="open" class="cascader-subitem">
            <item v-for="(item, index) in model.childTree" :model="item" :key="index" v-on="$listeners"></item>
        </ul>
    </li>
</template>

<script type="text/javascript">
    export default {
        // 组件递归必要条件，name属性
        name: 'item',
        props: ['model'],
        data() {
            return {
                // 控制子列表的显示隐藏
                open: false
            }
        },
        computed: {
            // 是否还有子列表需要渲染，作为v-if的判断条件
            isFolder() {
                return this.model.childTree && this.model.childTree.length
            }
        },
        methods: {
            // 切换列表显示隐藏的方法
            toggleIn() {
                if(this.isFolder) {
                    this.open = true
                }
            },
            toggleOut() {
                if(this.isFolder) {
                    this.open = false
                }
            },
            handleClick() {
               !this.isFolder && this.$emit('click', this.model);
            }
        }
    }
</script>
<style lang="scss" scoped>
.cascader-item{
    position: relative;
    background: #fff;

    height: 30px;
    padding: 0 30px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    .left-icon{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left: 10px;
        
        font-size: 14px;
    }
    .text{ white-space:nowrap }
}
.cascader-subitem{
    position: absolute;
    left: 100%;
    top: -5px;

    border-radius: 3px;
    box-shadow: #ccc 0px 0px 10px 1px;
    padding: 5px 0;
    box-sizing: border-box;
    background: white;

}

// .cascader-item + .cascader-item{
//     border-bottom: 1.5px solid #ccc;
// }
</style>