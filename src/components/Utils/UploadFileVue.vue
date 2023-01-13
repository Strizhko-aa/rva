<template>
  <div>
    <div v-if="!file">
      <div :class="['dropZone', dragging ? 'dropZone-over' : '']" @dragenter="dragging = true" @dragleave="dragging = false">
        <div class="dropZone-info" @drag="onChange">
          <span class="fa fa-cloud-upload dropZone-title"></span>
          <span class="dropZone-title">Перетащите файл сюда или нажмите для загрузки</span>
          <div class="dropZone-upload-limit-info">
            <div>поддерживаемый формат: .jpg, .jpeg, .png</div>
            <div>максимальный размер файла 25Мб</div>
          </div>
        </div>
        <input type="file" accept=".jpg,.jpeg,.png" @change="onChange">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'file-drag-n-drop',
  data: () => ({
    file: '',
    dragging: false
  }),

  computed: {
    extension() {
      if (this.file) {
        return this.file.name.split(".").splice(-1,1)[0]
      } else {
        return ''
      }
    }
  },

  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      
      if (!files.length) {
        this.dragging = false;
        return;
      }
      
      this.createFile(files[0]);
    },
    createFile(file) {
      const extension = file.name.split(".").splice(-1,1)[0]
      if (!(['jpg', 'jpeg', 'png'].includes(extension))) {
        alert('Загружайте файлы .jpg, .jpeg, .png');
        this.dragging = false;
        return;
      }
      
      if (file.size > 26000000) {
        alert('размер файла не превышать 25Мб')
        this.dragging = false;
        return;
      }
      
      this.file = file;
      console.log(this.file);
      this.dragging = false;
      this.$emit('select-file', this.file)
    },
    removeFile() {
      this.file = '';
    }
  },
}
</script>

<style>
.dropZone {
  width: 100%;
  height: 400px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975A0;
}

.dropZone-info {
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5C5C5C;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 80%;
  height: 200px;
  position: relative;
  border: 2px dashed #eee;
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #A8A8A8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>