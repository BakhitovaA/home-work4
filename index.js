'use strict'; 
const fs = require('fs');
const conf = { encoding: 'utf8' }; 
const crypto = require('crypto');

//Создать два потока: чтение и запись файла.

const input = fs.createReadStream("enter.txt");
const output = fs.createWriteStream("exit.txt");

/*
Используя crypto.createHash() вычислить md5 читаемых данных.
Результат вывести в консоль и записать в файл.
Использовать pipe()
*/

input.pipe(crypto.createHash('md5')).pipe(process.stdout);
input.pipe(crypto.createHash('md5')).pipe(output);

//Расширить предыдущие решние используя stream.Transform

const Transform = require('stream').Transform;

/*
Реализовать свой класс, который будет конвертировать результат crypto.createHash() (бинарные данные - хеш-сумма) в hex формат.
*/

class HashTransformer extends Transform {
        constructor(options={}) {
		super(options);
		this.cr = crypto.createHash('md5')
	} 
	_transform(chunk, _ , callback) {
		this.push(this.cr.update(chunk).digest("hex"));
		callback();
	}
}

/*
Результат вывести в консоль и записать в файл.
Использовать pipe()
*/

let str = input.pipe(new HashTransformer())

str.pipe(process.stdout);
str.pipe(output);