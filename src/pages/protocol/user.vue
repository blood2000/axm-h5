<template>
	<view class="user-page">
		<!-- <WhiteHeader :showBack="true">
			<text slot="title">隐私政策</text>
		</WhiteHeader> -->
		
		<view class="user-page__header">隐私政策</view>
		
		<view class="user-page__content">福建大道成物流科技有限公司尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，福建大道成物流科技有限公司自主研发的超好运网络货运信息平台会按照本隐私权政策的规定使用和披露您的个人信息。但超好运网络货运信息平台将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，超好运网络货运信息平台不会将这些信息对外披露或向第三方提供。超好运网络货运信息平台会不时更新本隐私权政策。 您在同意超好运网络货运信息平台服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于超好运网络货运信息平台服务使用协议不可分割的一部分。</view>
		
		<view class="user-page__title">1、适用范围</view>
		<view class="user-page__content">a) 在您注册超好运网络货运信息平台帐号时，您根据超好运网络货运信息平台要求提供的个人注册信息。</view>
		<view class="user-page__content">b) 在您使用超好运网络货运信息平台网络服务，或访问超好运网络货运信息平台平台网页时，超好运网络货运信息平台自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据。</view>
		<view class="user-page__content">c) 超好运网络货运信息平台通过合法途径从商业伙伴处取得的用户个人数据。</view>
		<view class="user-page__content">您了解并同意，以下信息不适用本隐私权政策：</view>
		<view class="user-page__content">a) 您在使用超好运网络货运信息平台平台提供的搜索服务时输入的关键字信息。</view>
		<view class="user-page__content">b) 超好运网络货运信息平台收集到的您在超好运网络货运信息平台发布的有关信息数据，包括但不限于参与活动、成交信息及评价详情。</view>
		<view class="user-page__content">c) 违反法律规定或违反超好运网络货运信息平台规则行为及超好运网络货运信息平台已对您采取的措施。</view>
		
		<view class="user-page__title">2、信息使用</view>
		<view class="user-page__content">a) 超好运网络货运信息平台不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和超好运网络货运信息平台（含超好运网络货运信息平台关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。</view>
		<view class="user-page__content">b) 超好运网络货运信息平台亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息。任何超好运网络货运信息平台平台用户如从事上述活动，一经发现，超好运网络货运信息平台有权立即终止与该用户的服务协议。</view>
		<view class="user-page__content">c) 为服务用户的目的，超好运网络货运信息平台可能通过使用您的个人信息，包括但不限于IMEI、IMSI、设备MAC地址、软件列表、设备序列号、android ID，以向您提供您感兴趣的信息和服务，包括但不限于向您发出产品和服务信息，或者与超好运网络货运信息平台合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。以下为所使用的权限名称及对应场景。</view>
		<view class="user-page__table">
			<uni-table border emptyText="暂无数据">
			    <tbody>
					<uni-tr>
					   <uni-td><b>权限名称</b></uni-td>
					   <uni-td><b>使用场景</b></uni-td>
					   <uni-td><b>调用路径</b></uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.CAMERA</uni-td>
					   <uni-td>
							<p>1.扫描二维码、条形码</p>
							<p>2.拍摄凭证</p>
					   </uni-td>
					   <uni-td>应用首页-运输tab页-装卸货凭证填写</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.READ_PHONE_STATE</uni-td>
					   <uni-td>
						   <p>1.获取设备信息</p>
						   <p>2.查询设备是否安装高德地图</p>
					   </uni-td>
					   <uni-td>开屏页</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.CALL_PHONE</uni-td>
					   <uni-td>拨打电话</uni-td>
					   <uni-td>首页-我的-联系客服</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.READ_EXTERNAL_STORAGE</uni-td>
					   <uni-td>1.拍照</uni-td>
					   <uni-td>应用首页-运输tab页-装卸货凭证填写</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.WRITE_EXTERNAL_STORAGE</uni-td>
					   <uni-td>1.相册选择</uni-td>
					   <uni-td>应用首页-运输tab页-装卸货凭证填写</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.ACCESS_COARSE_LOCATION</uni-td>
					   <uni-td>定位</uni-td>
					   <uni-td>应用首页-我的-地址管理-新增地址</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>android.permission.ACCESS_FINE_LOCATION</uni-td>
					   <uni-td>定位</uni-td>
					   <uni-td>应用首页-我的-地址管理-新增地址</uni-td>
					</uni-tr>
			    </tbody>
			</uni-table>
		</view>
		<view class="user-page__content">d) 为服务用户的目的，超好运网络货运信息平台可能通过使用您的个人信息，向友盟/极光/个推等第三方SDK获取推送服务，以便他们向您发送超好运网络货运信息平台各业务节点所需的推送信息（后者需要您的事先同意）。</view>
		<view class="user-page__content">e) 为保障超好运APP相关功能的实现与应用的稳定运行，我们可能会接入第三方提供的软件开发包，以实现相关目的。关于第三方如何收集、使用您的个人信息保护政策，您可以通过链接查看第三方的信息收集使用和保护规则。请您查看超好运APP涉及嵌入第三方代码、插件传输个人信息的情况说明。</view>
		<view class="user-page__table">
			<uni-table border emptyText="暂无数据">
			    <tbody>
					<uni-tr>
					   <uni-td><b>SDK名称</b></uni-td>
					   <uni-td><b>第三方机构名称</b></uni-td>
					   <uni-td><b>收集及使用个人信息目的</b></uni-td>
					   <uni-td><b>收集个人信息的范围</b></uni-td>
					   <uni-td><b>隐私政策/官网链接</b></uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>个推SDK</uni-td>
					   <uni-td>每日互动股份有限公司</uni-td>
					   <uni-td>收集应用使用情况,分析不同设备的表现,用以优化应用运行稳定性、用户使用体验、产品流程优化</uni-td>
					   <uni-td>唯一设备识别码（IMEI/Mac/android ID/IDFA/OPENUDID/GUID、SIM 卡 IMSI 信息）以提供统计分析服务，并通过地理位置校准报表数据准确性,SDK/API/JS代码版本、浏览器、互联网服务提供商、平台、时间戳、应用标识符、应用程序版本、应用分发渠道、独立设备标识符、设备型号、传感器参数、终端制造厂商、终端设备操作系统版本等</uni-td>
					   <uni-td>https://www.getui.com/privacy</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>高德SDK</uni-td>
					   <uni-td>高德软件有限公司</uni-td>
					   <uni-td>用于展现地图，实现定位、用于显现两点之间路径规划等功能</uni-td>
					   <uni-td>设备标识信息、位置信息</uni-td>
					   <uni-td>http://cache.amap.com/h5/h5/publish/238/index.html</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>阿里SDK</uni-td>
					   <uni-td>阿里云计算有限公司</uni-td>
					   <uni-td>根据相关法律法规的要求，需要通过人脸识别来进行实人认证</uni-td>
					   <uni-td>相册、摄像头、面部特征</uni-td>
					   <uni-td>http://terms.aliyun.com/legal-agreement/terms/suit_bu1_ali_cloud/suit_bu1_ali_cloud201902141711_54837.html?spm=5176.19720258.J_9220772140.87.6a492c4afJcY9W</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>腾讯SDK</uni-td>
					   <uni-td>腾讯科技（深圳）有限公司</uni-td>
					   <uni-td>提供用户错误日志收集</uni-td>
					   <uni-td>设备信息、位置信息、日志信息</uni-td>
					   <uni-td>http://bugly.qq.com/v2/contract</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>移动SDK</uni-td>
					   <uni-td>中国移动</uni-td>
					   <uni-td>提供一键登录</uni-td>
					   <uni-td>设备信息</uni-td>
					   <uni-td>http://dev.10086.cn/</uni-td>
					</uni-tr>
			    </tbody>
			</uni-table>
		</view>
		
		<view class="user-page__title">3、信息披露</view>
		<view class="user-page__content">在如下情况下，超好运网络货运信息平台将依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：</view>
		<view class="user-page__content">a) 经您事先同意，向第三方披露。</view>
		<view class="user-page__content">b) 为提供您所要求的产品和服务，而必须和第三方分享您的个人信息。</view>
		<view class="user-page__content">c) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露。</view>
		<view class="user-page__content">d) 如您出现违反中国有关法律、法规或者超好运网络货运信息平台服务协议或相关规则的情况，需要向第三方披露。</view>
		<view class="user-page__content">e) 如您是适格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷。</view>
		<view class="user-page__content">f) 在超好运网络货运信息平台平台上创建的某一交易中，如交易任何一方履行或部分履行了交易义务并提出信息披露请求的，超好运网络货运信息平台有权决定向该用户提供其交易对方的联络方式等必要信息，以促成交易的完成或纠纷的解决。</view>
		<view class="user-page__content">g) 其它超好运网络货运信息平台根据法律、法规或者网站政策认为合适的披露。</view>
		
		<view class="user-page__title">4、信息存储和交换</view>
		<view class="user-page__content">超好运网络货运信息平台收集的有关您的信息和资料将保存在超好运网络货运信息平台及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或超好运网络货运信息平台收集信息和资料所在地的境外并在境外被访问、存储和展示。</view>
		
		<view class="user-page__title">5、注销个人账户</view>
		<view class="user-page__content">a) 您有权注销您的超好运账户。你可在清空钱包余额和电话联系超好运客服400-827-0535提交注销申请，您的注销申请将在15个工作日内完成处理。</view>
		<view class="user-page__content">b) 除法律法规另有规定外，注销账户后超好运将停止为您提供服务，并在满足法律法规要求的最短保存期限要求的情况下，对您的个人信息进行删除或匿名化处理，且不再对您的个人信息进行商业化使用。</view>
		
		<view class="user-page__title">6、Cookie的使用</view>
		<view class="user-page__content">a) 在您未拒绝接受cookies的情况下，超好运网络货运信息平台会在您的计算机上设定或取用cookies，以便您能登录或使用依赖于cookies的超好运网络货运信息平台平台服务或功能。超好运网络货运信息平台使用cookies可为您提供更加周到的个性化服务，包括推广服务。</view>
		<view class="user-page__content">b) 您有权选择接受或拒绝接受cookies。您可以通过修改浏览器设置的方式拒绝接受cookies。但如果您选择拒绝接受cookies，则您可能无法登录或使用依赖于cookies的超好运网络货运信息平台网络服务或功能。</view>
		<view class="user-page__content">c) 通过超好运网络货运信息平台所设cookies所取得的有关信息，将适用本政策。</view>
		
		<view class="user-page__title">7、信息安全</view>
		<view class="user-page__content">a) 超好运网络货运信息平台帐号均有安全保护功能，请妥善保管您的用户名及密码信息。超好运网络货运信息平台将通过对用户密码进行加密等安全措施确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您注意在信息网络上不存在“完善的安全措施”。</view>
		<view class="user-page__content">b) 在使用超好运网络货运信息平台网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是超好运网络货运信息平台用户名及密码发生泄露，请您立即联络超好运网络货运信息平台客服，以便超好运网络货运信息平台采取相应措施。</view>
		
		<view style="margin-bottom: 100rpx"></view>
	</view>
</template>

<script>
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	export default {
		components: {
			WhiteHeader
		}
	}
</script>

<style lang="scss" scoped>
	.user-page{
		height: 100%;
		padding: 0 60rpx;
		background: #fff;
		color: #444;
		overflow-y: auto;
		// padding-top: 130upx;
		&__header{
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			line-height: 100rpx;
			padding-top: 30rpx;
			color: #333;
		}
		&__title{
			font-size: 28rpx;
			font-weight: 700;
			margin: 30rpx 0;
		}
		&__content{
			font-size: 28rpx;
			text-indent: 2em;
			line-height: 40rpx;
			word-break: break-all;
		}
		&__table{
			font-size: 26rpx;
			font-weight: normal;
			line-height: 40rpx;
			margin: 30rpx 0;
			.table--border, .uni-table-td{
				border-color: #606266;
			}
			.uni-table-td{
				min-width: 100rpx;
				padding: 10rpx 12rpx;
				word-break: break-all;
			}
		}
	}
</style>
