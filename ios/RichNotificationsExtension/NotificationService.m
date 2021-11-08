//
//  NotificationService.m
//  RichNotificationsExtension
//
//  Created by Roland Arnaud on 30/11/2021.
//

#import "NotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

@end
