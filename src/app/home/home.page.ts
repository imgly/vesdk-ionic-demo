import {Component} from '@angular/core';

// Declaring the modules for VESDK
declare var VESDK;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor() {}

  vesdk_success(result) {
    if (result != null) {
      alert('VESDK result: ' + result.video);
    } else
      console.log('vesdk_success: result is null, the editor was canceled');
  };

  vesdk_failure(error) {
    console.log('vesdk_failure: ' + JSON.stringify(error))
  };

  onButtonClick(event) {
    /* The license should have an extension like this:
       for iOS: "xxx.ios", example: vesdk_license.ios
       for Android: "xxx.android", example: vesdk_license.android
       then pass just the name without the extension to the
       `unlockWithLicense` function */
    // VESDK.unlockWithLicense('www/assets/pesdk_license');

    var config = {
      // Configure sticker tool
      sticker: {
        // Enable personal stickers
        personalStickers: true,
        // Configure stickers
        categories: [
          // Create sticker category with stickers
          {
            identifier: 'example_sticker_category_logos',
            name: 'Logos',
            thumbnailURI: VESDK.loadResource("www/assets/imgly-Logo.png"),
            items: [
              {
                identifier: 'example_sticker_logos_ionic',
                name: 'Ionic',
                stickerURI: VESDK.loadResource('www/assets/icon/favicon.png'),
              },
              {
                identifier: 'example_sticker_logos_imgly',
                name: 'img.ly',
                tintMode: "colorized",
                stickerURI: VESDK.loadResource('www/assets/imgly-Logo.png'),
              },
            ]
          },
          // Reorder and use existing sticker categories
          { identifier: 'imgly_sticker_category_animated' },
          { identifier: 'imgly_sticker_category_emoticons' },
          // Modify existing sticker category
          {
            identifier: 'imgly_sticker_category_shapes',
            items: [
              { identifier: 'imgly_sticker_shapes_badge_01' },
              { identifier: 'imgly_sticker_shapes_arrow_02' },
              { identifier: 'imgly_sticker_shapes_spray_03' },
            ]
          },
        ]
      }
    };

    VESDK.openEditor(
        this.vesdk_success, this.vesdk_failure,
        VESDK.loadResource('www/assets/Skater.mp4'), config);
  }
}
