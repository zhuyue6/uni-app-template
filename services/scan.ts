import {request, utils} from '@/shared'

const imageReg = /^image\/(jpeg|png|jpg|gif|psd|tif|bmp)/

export async function scan(type=1) {
	// 车牌vin识别 type 1 车牌, 2 vin
	const openCameraData = await utils.openCamera();
	if ('length' in openCameraData.tempFiles && openCameraData.tempFiles.length > 0) {
		const file = openCameraData.tempFiles[0]
		if (file instanceof File && imageReg.test(file.type)) {
			return request.uploadFiles([{
				name: 'file',
				file
			}], {
				type,
			});
		} else {
			utils.errorTip('请选择正确图片文件')
			return Promise.reject()
		}
	}
	return Promise.reject()
}