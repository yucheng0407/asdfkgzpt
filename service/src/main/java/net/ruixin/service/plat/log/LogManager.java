package net.ruixin.service.plat.log;

import net.ruixin.util.spring.SpringContextHolder;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.TimerTask;

/**
 * 日志管理器
 */
public class LogManager {

    //异步操作记录日志的线程池
//    private ScheduledThreadPoolExecutor executor = new ScheduledThreadPoolExecutor(10);

    private LogManager() {
    }

    private static final LogManager logManager = new LogManager();

    public static LogManager me() {
        return logManager;
    }

    public void executeLog(TimerTask task) {
        int OPERATE_DELAY_TIME = 1000;
        ((ThreadPoolTaskExecutor)SpringContextHolder.getBean("myexecutor")).execute(task, OPERATE_DELAY_TIME);
//        executor.schedule(task, OPERATE_DELAY_TIME, TimeUnit.MILLISECONDS);
    }
}
