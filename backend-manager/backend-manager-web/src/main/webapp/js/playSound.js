//添加要播放声音 String ,声音开始播放要执行的方法，声音播放结束时要执行的方法，容器
//返回声音文件的队列下班，用于移除 int
function AddPlaySound(url, functionStart, functionEnd, HTML) {
    if (url) {
                if (HTML) {
                    HTML = "body";
                }
                g_play_sound_queue_url[g_play_sound_queue_url.length] = url;
                g_play_sound_queue_start[g_play_sound_queue_start.length] = functionStart;
                g_play_sound_queue_end[g_play_sound_queue_end.length] = functionEnd;
                g_play_sound_queue_html[g_play_sound_queue_html.length] = HTML
                StartPlayer();
    }
}
//输入AddPlaySound(url)所返回的下标 int
//返回是否删除成功 bool
function RemovePlaySound(index) {
    if (index < g_play_sound_queue_url.length) {
        g_play_sound_queue_url[index] = null;
        g_play_sound_queue_start[index] = null;
        g_play_sound_queue_end[index] = null;
        g_play_sound_queue_html[index] = null;
        //清除垃圾
        GarbageRemoval();
        return true;
    } else {
        return false;
    }
}
//启动播放器
function StartPlayer(interval) {
    if (interval == null) {
        interval = 100
    }
    if (!g_PlaySoundTimer) {
        g_PlaySoundTimer = setInterval("SystemFunction();", interval);
        return true;
    } else {
        return false;
    }
}
//不需要调用
function SystemFunction() {
    var player = $("video")[0];
    if (!player) {
        //添加播放器
        for (var i = 0; i < g_play_sound_queue_html.length; i++) {
            if (g_play_sound_queue_html[i]) {
                $(g_play_sound_queue_html[i]).append("<video hidden='hidden' autoplay='autoplay' controls='controls' src='" + g_play_sound_queue_url[i] + "'>不支持播放器</vodeo>");
                if (g_play_sound_queue_start[i]) {
                    g_play_sound_queue_start[i]();
                }
                break;
            }
        }
    } else {
        if (player.ended) {
            for (var i = 0; i < g_play_sound_queue_url.length; i++) {
                if (g_play_sound_queue_url[i]) {
                    if (g_play_sound_queue_end[i]) {
                        g_play_sound_queue_end[i]();
                    }
                    player.remove();
                    g_play_sound_queue_url[i] = null;
                    g_play_sound_queue_start[i] = null;
                    g_play_sound_queue_end[i] = null;
                    g_play_sound_queue_html[i] = null;
                    GarbageRemoval();
                    break;
                }
            }
        }
    }
}
//关闭播放器
function ClosePlayer() {
    if (g_PlaySoundTimer) {
        window.clearInterval(g_PlaySoundTimer);
        g_PlaySoundTimer = null;
        return true;
    } else {
        return false;
    }
}
//清除垃圾
function GarbageRemoval() {
    var flag = false;
    for (var i = 0; i < g_play_sound_queue_url.length; i++) {
        if (g_play_sound_queue_url[i] != null) {
            break;
        }
        if (g_play_sound_queue_url.length - 1 == i) {
            flag = true;
        }
    }
    if (flag) {
        g_play_sound_queue_url = [];
        g_play_sound_queue_start = [];
        g_play_sound_queue_end = [];
        g_play_sound_queue_html = [];
        ClosePlayer();
    }
}

////以下是调用实例
//$(document).ready(function () {
//    AddPlaySound("http://e.waimai.meituan.com/static/595b1240/media/refundSound200.ogg", kaishu, jieshu, "div");//向播放器队列里添加声音文件
//});
//function kaishu() {
//    layer.msg("开始播放");
//}
//function jieshu() {
//    layer.msg("结束播放");
//}