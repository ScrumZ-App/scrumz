<template>
    <button>
    <a href="/room">Create Room</a>
    </button>

<input type="text" name="roomId" id="room_id">
    <button>
    <a href="/room">Join Room</a>
    
    </button>
    <button>
        
    </button>
    <CopyUrl/>
    <QrCode/>
   
    
</template>
  <script>
import QrCode from '~/components/QrCode.vue';
import CopyUrl from '~/components/CopyUrl.vue';
export default{
    components :{
        QrCode,
        CopyUrl
    }
}
</script>