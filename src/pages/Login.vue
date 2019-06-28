<template>
    <div class="login-wrapper">
        <div class="position-center">
            <h2 class="title">请先绑定你的手机</h2>
            <van-cell-group>
                <van-field
                    v-model="mobile"
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="code"
                    center
                    clearable
                    label="验证码"
                    placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" type="primary" :disabled="!show" @click="sendSms">{{show ? '获取验证码' : count + '秒后获取'}}</van-button>
                </van-field>
                <van-field
                    readonly
                    clickable
                    label="公司"
                    :value="companyName"
                    placeholder="请选择公司"
                    @click="showPicker = true"
                />
                
            </van-cell-group>
            <van-button type="primary" class="ensure" @click="submit" :disabled="companyName == '' ? true : false">确定</van-button>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                value-key="companyName"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mobile: '',
            code: '',
            companyId: '',
            companyName: '',
            show: true,
            count: '',
            timer: null,
            showPicker: false,
            columns: ['暂无数据']
        }
    },
    created () {
        localStorage.removeItem('userInfo');
    },
    methods: {
        onConfirm(value) {
            if (value == '暂无数据') {
                this.company = '';
            } else {
                this.companyName = value.companyName
                this.companyId = value.companyId;
            }
            this.showPicker = false;
        },
        countdown() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000)
            }
        },
        sendSms() {
            if (this.mobile == '') {
                this.$toast("手机号不能为空");
                return;
            };
            let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(this.mobile)) {
                this.$toast("请输入有效的手机号");
                return;
            }; 
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/sendSms.do', {
                data: {
                    phone: this.mobile
                },
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg === 'SUCCESS') {
                        this.$toast("发送成功");
                        this.flag = true;
                        this.countdown();
                        if (res.data && res.data.length > 0) {
                            this.columns = res.data;
                        }
                    } else {
                        this.$toast("发送失败");
                    }
                })
            })
        },
        submit() {
            // 校验短信验证码
            if (this.code == '') {
                this.$toast("请获取验证码");
                return;
            };
            $.ajax(this.$host.http_api + '/fcCommon/checkSms.do', {
                data: {
                    checkCode: this.code,
                    companyId: this.companyId
                },
                xhrFields: { 
                    withCredentials: true //允许带上凭据
                },
                crossDomain: true,
                success: ((res) => {
                    if (res.msg !== 'SUCCESS') {
                        this.$toast("验证码错误");
                        return;
                    }

                    this.$eventHub.$emit('loading', true);
                    $.ajax(this.$host.http_api + '/fcCommon/login.do', {
                        data: {
                            phone: this.mobile,
                            companyId: this.companyId
                        },
                        xhrFields: { 
                            withCredentials: true //允许带上凭据
                        },
                        crossDomain: true,
                        success: ((res) => {
                            if (res.msg === 'ERROR') {
                                this.$toast("登录失败");
                                return;
                            }
                            localStorage.setItem('userInfo', JSON.stringify(res.data));
                            this.$eventHub.$emit('loading', false);
                            this.$router.push('/home')
                        })
                    })
                })
            })
        }
    }
}
</script>


<style lang="less" scoped>
    .login-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
        background-color: #fff;

        .title {
            margin-bottom: 15%;
        }

        .ensure {
            width: 80%;
            margin-top: 10%;
        }

        .position-center {
            width: 100%;
            position: absolute;
            top: 30%;
            transform: translateY(-30%);
            z-index: 1;
            text-align: center;
        }
    }
</style>
