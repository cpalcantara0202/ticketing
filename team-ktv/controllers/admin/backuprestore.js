const { exec } = require('child_process');

module.exports = class TemplateController {

    async dbbackup (req, res){
        const dbBackup = 'users'; 
        const backupFolder = 'C:\Users\PEMPCO\Desktop\Innova\public\backup'; 
        
        const startBackup = `mongodump --db ${dbBackup} --out ${backupFolder}`;
        
        exec(startBackup, (error, stdout, stderr) => {
          if (error) {
            console.error(`Backup failed: ${error}`);
          } else {
            console.log('Backup completed successfully.');
          }
        });
    }
     async dbrestore (req, res){
  
        const dbRestore = 'users'; 
        const restoreFolder = 'mongodb+srv://cpalcantara02:Thesis2023@cluster0.lqi7lcv.mongodb.net/db_Innova'; 

        const startRestore = `mongorestore --db ${dbRestore} ${restoreFolder}/${users}`;

        exec(startRestore, (error, stdout, stderr) => {
        if (error) {
            console.error(`Restore failed: ${error}`);
        } else {
            console.log('Restore completed successfully.');
        }
    });
  }
}

