//backend_bridge.js
var rexec = require('remote-exec');
var fs = require('fs');
var async = require('async');
var cfg = require('./config');


module.exports.createInstance = function(os,nama_instance,callback)
{
    cfg.ssh_options.stdout = fs.createWriteStream('./out.txt');
    cmds=['xe vm-clone vm='+os+' new-name-label="'+nama_instance+'"'];
    rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var uuid_vm = fs.readFileSync('out.txt', 'utf8');
            uuid_vm = uuid_vm.trim();
            console.log('a vm has been created');
            console.log(uuid_vm.trim());
            callback(null,uuid_vm);
        }
    });
};

module.exports.getInstanceUUID = function(nama_instance,callback)
{

    cmds=['xe vm-list name-label="'+nama_instance+'" --minimal'];
    rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var uuid_vm = fs.readFileSync('out.txt','utf8');
            callback(null,uuid_vm);
        }
     });
};

module.exports.scaleInstance = function(cpu,memori,storage,uuid,nama_instance,callback)
{
    cmds=[
            'xe vm-param-set VCPUs-max='+cpu+' uuid='+uuid,
            'xe vm-param-set VCPUs-at-startup='+cpu+' uuid='+uuid,
            'xe vm-param-set memory-static-max='+memori+'GiB uuid='+uuid,
            'xe vm-param-set memory-dynamic-max='+memori+'GiB uuid='+uuid,
            'xe vm-param-set memory-static-min=256 uuid='+uuid,
            'xe vm-param-set memory-dynamic-min=1GiB uuid='+uuid,
            'resize_vm_disk '+nama_instance+' '+storage
        ];
        rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("new vm configured successfully..");
            callback(null,uuid);
        }
     });
};

module.exports.getInstanceIP = function(uuid,callback)
{
    cfg.ssh_options.stdout = fs.createWriteStream('./out.txt');
    cmds=[
            'xe vm-param-get uuid='+uuid+' param-name=networks'
        ];
        rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var ipstring = fs.readFileSync('out.txt','utf8');
            console.log(ipstring);
            var ip = ipstring.split(";");
            console.log(ip)
            var ip2 = ip[0].split(":");
            console.log(ip2)
            var tmp = ip2[1];
            console.log(tmp);
            if(tmp == undefined)
            {
                var final_address = "gagal mendapatkan IP silahkan tunggu sampai vm selesai menyala";
            }
            else
            {
                var ip_hasil = tmp.trim();
                console.log(ip_hasil);
                var ip_split = ip_hasil.split('.');
                console.log(ip_split[3]);
                var hostid = parseInt(ip_split[3]);
                var url_port = 3000 + (hostid-150);
                if(url_port<3000)
                {
                    var final_address = "gagal mendapatkan IP silahkan tunggu sampai vm selesai menyala";
                }
                else
                {
                    var final_address = 'cloudvm2.ddns.net:'+ url_port;
                }

            }

            callback(null,final_address);
        }
     });
};

module.exports.getInstanceMAC = function(name,uuid,callback)
{
    cfg.ssh_options.stdout = fs.createWriteStream('./out.txt');
    cmds=[
            'xe vif-list device=0 vm-name-label="'+name+'" params=MAC --minimal'
        ];
        rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            var mac = fs.readFileSync('out.txt','utf8');
            callback(null,mac,uuid);
        }
     });
};

module.exports.deleteInstance = function(uuid,callback)
{
    cmds=[
            'xe vm-uninstall uuid='+uuid+' force=true'
        ];
        rexec(cfg.hosts, cmds, cfg.ssh_options, function(err){
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log("vm is deleted..");
            callback(null,uuid);
        }
     });
};

