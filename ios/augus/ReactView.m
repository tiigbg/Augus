#import "RCTRootView.h"
#import "ReactView.h"

@implementation ReactView

- (void)awakeFromNib {
NSURL *jsCodeLocation = [NSURL URLWithString:@"http://172.20.10.3:8081/index.ios.bundle?platform=ios"];
// For production use, this `NSURL` could instead point to a pre-bundled file on disk:
//
//   NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
//
// To generate that file, run the curl command and add the output to your main Xcode build target:
//
//   curl http://localhost:8081/index.ios.bundle -o main.jsbundle
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                    moduleName: @"augus"
                                             initialProperties:nil
                                                 launchOptions:nil];
[self addSubview:rootView];
    self.layer.zPosition = MAXFLOAT;
    rootView.frame = self.bounds;
}

// allow audio while video is playing
[[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];

@end