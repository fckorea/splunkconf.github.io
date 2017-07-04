'use strict';

/**
 * @ngdoc function
 * @name splunkconfApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the splunkconfApp
 */
angular.module('splunkconfApp')
  .controller('MainCtrl', function($scope, $anchorScroll, $location, $timeout) {
    $('.ui.checkbox').checkbox();
    $('.ui.form .fa-question-circle').popup({ on: 'click' });

    $scope.tcpoutGroupNameChange = function(newVal, oldVal) {
      console.log('remove ' + oldVal);
      $('.ui.dropdown').dropdown('remove selected', oldVal);
    };

    $scope.setCLICommand = function(argCommand) {
      $scope.cliConfigCommand = [];
      for(var i=0;i<argCommand.length;i++) {
        $scope.cliConfigCommand.push('<kbd>$ ' + ($scope.$SPLUNK_HOME === '' ? './':$scope.$SPLUNK_HOME) +  ($scope.$SPLUNK_HOME[$scope.$SPLUNK_HOME.length - 1] === '/' || $scope.$SPLUNK_HOME === '' ? 'bin/splunk':'/bin/splunk') + ' ' + argCommand[i] + '</kbd>');
      }
    }

    $scope.inputs = {
      get contents() {
        var config = [
          '[monitor://' + (this.path ? this.path:'{ NONE }') + ']',
          'disabled = false',
          'followTail = ' + (this.followTail ? 1:0),
          'index = ' + (this.index ? this.index:'{ NONE }'),
          'sourcetype = ' + (this.sourcetype ? this.sourcetype:'{ NONE }'),
          ((this.source === undefined || this.source === '') ? '':('source = ' + this.source))
        ];

        // return '[monitor://' + (this.path ? this.path:'{ NONE }') + ']\ndisabled = false\nfollowTail = ' + (this.followTail ? 1:0) + '\nindex = ' + (this.index ? this.index:'{ NONE }') + '\nsourcetype = ' + (this.sourcetype ? this.sourcetype:'{ NONE }') + '\n' + ((this.source === undefined || this.source === '') ? '':('source = ' + this.source + '\n'));
        return config.join('\n');
      }
    };

    $scope.props = {
      get contents() {
        var config = [
          '[' + this.spec + (this.name ? this.name:'{ NONE }') + ']'
        ];

        // return '[' + this.spec + (this.name ? this.name:'{ NONE }') + ']\n';
        return config.join('\n');
      }
    };

    $scope.outputs = {
      get contents() {
        var config = [
          '[tcpout]',
          'defaultGroup = ' + (this.defaultGroup.length > 0 ? this.defaultGroup.map(function(e) { return e.name }).join(', '):'{ NONE }'),
          'indexAndForward = ' + this.indexAndForward
        ];

        if(this.tcpoutGroups.length > 0) {
          config.push('');
          for(var i=0;i<this.tcpoutGroups.length;i++) {
            config.push('[tcpout:' + (this.tcpoutGroups[i].name === '' ? '{ NONE }':this.tcpoutGroups[i].name) + ']');

            if(this.tcpoutGroups[i].autoLB) {
              config.push('autoLB = true');
            }

            config.push('servers = ' + this.tcpoutGroups[i].servers.join(', '));
            config.push('');
          }
        }

        // return '[tcpout]\ndefaultGroup = ' + (this.name ? this.name:'{ NONE }') + '\n';
        return config.join('\n');
      }
    };

    $scope.btnListener = function(argButtonName) {
      switch(argButtonName) {
        case 'addTcpGroup':
          $scope.outputs.tcpoutGroups.push({ name: '', servers: [''] });
          // $scope.outputs.tcpoutGroups.push($scope.tcpoutGroup);
          // $scope.tcpoutGroup = { name: '', servers: [] };
          break;
        default:
      }
    };

    $scope.fileData = [
      {
        path: 'inputs.conf',
        contents: '[monitor:///data/log.log]\ndisabled = false\nindex = log'
      }
    ];
  });
