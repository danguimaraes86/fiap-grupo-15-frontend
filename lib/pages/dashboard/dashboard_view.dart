import 'package:bytebank/configs/system_colors.dart';
import 'package:bytebank/pages/dashboard/widgets/dashboard_app_bar.dart';
import 'package:bytebank/pages/shared/drawer.dart';
import 'package:flutter/material.dart';

import './widgets/dasboard_body.dart';

class DashboardView extends StatelessWidget {
  const DashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: SystemColors.background,
      appBar: DashboardAppBar(title: 'Dashboard'),
      drawer: AppDrawer(),
      body: const DashboardBody(),
    );
  }
}
