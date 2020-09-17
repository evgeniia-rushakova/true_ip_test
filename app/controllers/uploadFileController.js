var exports = module.exports = {}
const csv = require('csv-parser');
let path = require('path');
const fs = require('fs');
const iconv = require("iconv-lite");
let Sequelize = require("sequelize");
let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
let sequelize = new Sequelize(config.database, config.username, config.password, config);
let csvSeparator = ';';
let results = [];
let tableName = 'Employe';

let createTable = async (csvArr) => {
    if (csvArr) {
        let keys = Object.keys(csvArr[0]);
        let emptyModel = {
            id: {
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            }
        };
        keys.forEach((item) => {
            emptyModel[item] = {
                type: Sequelize.STRING,
            }
        })
        let model = sequelize.define(tableName, emptyModel);
        await model.sequelize.sync().catch(err => console(err));
        let models = [];
        csvArr.forEach(function (item) {
            let keys = Object.keys(item);
            keys.forEach(function (key) {
                if (item[key] && item[key] === '') {
                    item[key] = null;
                }
            })
            let promise = new Promise(function (resolve, reject) {
                (async () => {
                    await model.findOne({where: {'логин': item['логин']}}).then((itemval) => {
                        if (itemval == null)
                            model.create(item).then(() => resolve()).catch(function (err) {
                                reject(new Error(err))
                            })
                        else
                            resolve()
                    })
                })();
            })
            models.push(promise);
        })

        return Promise.all(models).catch(function (err) {
            throw new Error(`Something went wrong with the table\n ${err}`)
        })
    } else
        return new Error("Invalid file!");
}

exports.index = function (req, res) {
    let type = req.file.originalname.split('.').pop();
    if (req && req.file && req.file.path && type === 'csv') {
        fs.createReadStream(req.file.path)
            .pipe(iconv.decodeStream("win1251"))//this is only for files in windows 1251 encoding!!!
            .pipe(csv({
                separator: csvSeparator
            }))
            .on('data', (data) => {
                results.push(data)
            })
            .on('end', () => {
                createTable(results).then(() => {
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                    res.render('resultofupload', {result: 'CSV upload succesfully.'})
                }).catch((err) => {
                    console.log(err);
                    res.render('resultofupload', {result: `Error with file upload! Please, try again.\n ${err}`})
                })

            });
    } else
        res.render('uploadpage');
}