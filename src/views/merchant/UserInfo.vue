<template>
    <div style="padding: 10px;">
        <Card class="center">
            <img :src="merchantInfo.merchantAvatarUrl" style="width: 25%;"/>
            <Form  style="padding: 2% 20%;text-align: left;" label-position="left" :label-width="100">
                <FormItem label="商家ID" >
                    <Input type="text" disabled :value="merchantInfo.merchantId"/>
                </FormItem>
                <FormItem label="商家名称" >
                    <Input type="text"  v-model="merchantInfo.merchantName" />
                </FormItem>
                <FormItem label="地址" >
                    <Input type="text" v-model="merchantInfo.merchantSite" />
                </FormItem>
                <FormItem label="联系方式" >
                    <Input type="text" v-model="merchantInfo.merchantContact" />
                </FormItem>
                <FormItem label="认证状态" >
                    <Input type="text"  disabled  :value="merchantInfo.merchantCertificateState === 'Y'?'已认证':'未认证'"/>
                </FormItem>
                <FormItem label="状态" >
                    <Input type="text"  disabled  :value="merchantInfo.merchantStatus"/>
                </FormItem>
            </Form>
            <Button type="primary" @click="saveMerchantInfo">保存</Button>

        </Card>
    </div>
</template>

<script>
import { post } from '@/api'


export default {
    name: 'userinfo',
    data() {
        return {
            merchantInfo: { },
        }
    },
    mounted() {
        this.merchantInfo = JSON.parse(localStorage.getItem('merchantInfo'))
    },
    methods: {
        saveMerchantInfo() {
            if (JSON.stringify(this.merchantInfo) === localStorage.getItem('merchantInfo')) {
                return
            }
            let form = new FormData()
            let self = this
            form.append('merchantId', this.merchantInfo.merchantId)
            form.append('merchantName', this.merchantInfo.merchantName)
            form.append('merchantAvatarUrl', this.merchantInfo.merchantAvatarUrl)
            form.append('merchantSite', this.merchantInfo.merchantSite)
            form.append('merchantContact', this.merchantInfo.merchantContact)
            post('/merchant/update', form).then(res => {
                if (res === 'success') {
                    self.$Message.success('修改成功~')
                    localStorage.setItem("merchantInfo", JSON.stringify(self.merchantInfo))
                } else {
                    self.$Message.error('修改失败')
                }
            }).catch((error) => {
                self.$Message.error('修改失败')
                console.log(error)
            })
        },
    },
}
</script>

<style scoped>
.head-line{
    color: #17233d;
}

.center{
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 100%;
}
.name-input{
    max-width: 40%;
}


</style>
