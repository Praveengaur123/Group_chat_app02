const {CronJob}=require('cron')

const {Op}=require('sequelize')

const sequelize=require('../util/database')

const chat= require('../model/groupChat')

const archivedChat=require('../model/archivedChat')

console.log('cron initialize')
const job=new CronJob(
    '0 0 2 * * *', // every dat at 2 AM
    async function(){
        console.log("Running archieve job...")

        const t= await sequelize.transaction()

        try {
            const oneDayAgo=new Date(Date.now()-24*60*60*1000)
            // fetch old chats
            const oldChats=await chat.findAll({
                where:{
                    createdAt:{
                        [Op.lt]:oneDayAgo
                    }
                }
            });
            if(oldChats.length===0){
                console.log("No archive chats")
                await t.commit();
                return;
            }

            // prepare data
            const archivedData=oldChats.map(chat=>({
                chat:chat.chat,
                userId:chat.userId,
                groupId:chat.groupId,
                createdAt:chat.createdAt,
                updatedAt:chat.updatedAt

            }))
            // insert into archive table
            await archivedChat.bulkCreate(archivedData,{transaction:t});

            // delete from main table
            await chat.destroy({
                where:{
                    createdAt:{
                        [Op.lt]:oneDayAgo
                    }
                },
                transaction:t
            });
            await t.commit();
            console.log(`Archived ${oldChats.length} chat`);


        } catch (error) {
            await t.rollback();
            console.error('cron error',error)
        }
    },
    null,
    true,    // start immediately
    'Asia/Kolkata' // time zone
)

module.exports=job;
