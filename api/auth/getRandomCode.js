'use strict';
const crypto = require('crypto');
const uuid = require('uuid');
const AV = require('leanengine');

const byCrypto = e => {
	// isFinite 判断是否为有限数值
	console.log(e.params);
	let len = e.params.len;
	if (!Number.isFinite(len)) {
		throw new TypeError('Expected a finite number');
	}

	return crypto
		.randomBytes(Math.ceil(len / 2))
		.toString('hex')
		.slice(0, len);
};

const byUUID = () => {
	let code = uuid.v4();
	let InvitationCode = AV.Object.extend('InvitationCode');
	let codeObject = new InvitationCode();
	codeObject.set({ code });

	// 新建一个 ACL 实例
	var acl = new AV.ACL();
	acl.setPublicReadAccess(false);
	acl.getPublicWriteAccess(false);
	acl.setReadAccess('5d19ba8a30863b0070ef7faf', true);
	acl.setWriteAccess('5d19ba8a30863b0070ef7faf', true);

	// 将 ACL 实例赋予 codeObject 对象
	codeObject.setACL(acl);

	codeObject.save().then(
		function(testObject) {
			// 成功
			console.log(testObject);
		},
		function(error) {
			// 失败
		},
	);
	return code;
};

module.exports = byUUID;
